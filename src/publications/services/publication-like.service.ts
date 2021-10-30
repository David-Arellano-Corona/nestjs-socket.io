import { Injectable } from '@nestjs/common';
import { PublicationLikeArgs, PublicationLikeQueryArgs } from '../args';
import { PublicationRepository } from '../db/publication.repository';
import { PublicationLikeRepository } from '../db/publication-like.repository';
import { UserRepository } from '../../users/db/user.repository';
import { get_object_or_404 } from '../../common/utils';
import { RoomsService } from '../../socket-handler/services/rooms.service';
import { SocketService } from '../../socket-handler/services/socket.service';
import { SocketHandlerService } from '../../socket-handler/services/socket-handler.service';
import { SocketEvents, SocketRooms } from 'src/common/socket-events';

@Injectable()
export class PublicationLikeService {
    constructor(
        private publicationRepository: PublicationRepository,
        private publicationLikeRepository: PublicationLikeRepository,
        private userRepository: UserRepository,
        private roomService: RoomsService,
        private socketService: SocketService,
        private socketHandlerService: SocketHandlerService
    ) { }

    async getPublicaionLikesFromPublication(publicationLikeQueryArgs: PublicationLikeQueryArgs) {
        const publication = await this.publicationRepository.find(publicationLikeQueryArgs.publicationId);
        get_object_or_404(publication, 'La publicación fue eliminada')
        const likes = await this.publicationLikeRepository.getPublicationLikesFromPublication(publication);
        return likes;
    }

    async getPublicationLike(publicationLikeArgs: PublicationLikeArgs) {
        const user = await this.userRepository.findById(publicationLikeArgs.userId);
        const publication = await this.publicationRepository.find(publicationLikeArgs.publicationId);

        const publicationLike = await this.publicationLikeRepository.getPublicationLike(
            publication,
            user
        )
        return publicationLike;
    }

    async createPublicationLike(publicationLikeArgs: PublicationLikeArgs) {
        const user = await this.userRepository.findById(publicationLikeArgs.userId);
        const publication = await this.publicationRepository.find(publicationLikeArgs.publicationId);

        const existPublicationLike = await this.getPublicationLike(publicationLikeArgs)
        const roomName = `${SocketRooms.PUBLICATION}${publication._id}`
        const socketId = user.socketid;
        //@ts-ignore
        const isPublicationOwner = user._id == publication.owner._id
        

        if (!existPublicationLike) {
            const publicationLike = await this.publicationLikeRepository.createPublicationLike(
                publication,
                user
            )
            if (!isPublicationOwner) {
                this.roomService.createRoom(user, roomName)

                if (socketId) {
                    this.socketService.getSocket(socketId).join(roomName)
                    this.socketHandlerService.emitToRoom(roomName, SocketEvents.NEW_LIKE, { publication, user })
                }
            }
            const res = {
                id: publicationLike.id,
                publication: publicationLikeArgs.publicationId,
                user: user
            }
            return res;
        } else {
            await this.publicationLikeRepository.deletePublicationLike(publication, user);
            if (!isPublicationOwner) {
                if (socketId) {
                    this.socketHandlerService.emitToRoom(roomName, SocketEvents.DELETE_LIKE,{ publication, user })
                    this.socketService.getSocket(socketId).leave(roomName);
                }
            }
            return {
                id: publicationLikeArgs.publicationId,
                publication: 0,
                user: {
                    "name": "",
                    "firstname": "",
                    "id": ""
                }
            }
        }
    }
}