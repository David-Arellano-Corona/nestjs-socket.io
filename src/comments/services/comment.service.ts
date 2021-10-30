import { Injectable } from '@nestjs/common';
import { CommentRepository } from '../db/comment.repository';
import { UserRepository } from '../../users/db/user.repository';
import { PublicationRepository } from '../../publications/db/publication.repository';
import { RoomsRepository } from '../../common/db/rooms.repository';
import { CommentDocument } from '../db/comment.schema';
import { RoomsService } from '../../socket-handler/services/rooms.service';
import { SocketService } from '../../socket-handler/services/socket.service';
import { SocketHandlerService } from '../../socket-handler/services/socket-handler.service';
import { CommentInput } from '../inputs';
import { PublicationComment } from '../args';
import { get_object_or_404 } from '../../common/utils';
import { MESSAGES } from '../../common/messages';
import { SocketEvents, SocketRooms } from '../../common/socket-events';

@Injectable()
export class CommentService{
    constructor(
        private commentRepo: CommentRepository,
        private publicationRepository: PublicationRepository,
        private userRepository: UserRepository,
        private roomRepository: RoomsRepository,
        private socketService: SocketService,
        private socketHandlerService: SocketHandlerService,
        private roomService: RoomsService,
    ){}

    async createComment(commentDto: CommentInput):Promise<CommentDocument>{
        const user = await this.userRepository.findById(commentDto.owner);
        const publication = await this.publicationRepository.find(commentDto.publication);
        get_object_or_404(user, MESSAGES.USER_NOT_FOUND)
        get_object_or_404(publication, MESSAGES.PUBLICATION_NOT_FOUND)       
        
        const comment = await this.commentRepo.createComment(commentDto)

        //@ts-ignore
        const isPublicationOwner = user._id == publication.owner._id;
        const socketId = user.socketid;
        const roomName = `${SocketRooms.PUBLICATION}${publication._id}`
        if(!isPublicationOwner && socketId){
            const existRoom = await this.roomRepository.findRoomByUserAndRoom(user, roomName)
            if(!existRoom){
                await this.roomService.createRoom(user, roomName);
                this.socketService.getSocket(socketId).join(roomName);
            }           
            this.socketHandlerService.emitToRoom(roomName,SocketEvents.NEW_COMMENT,{
                commentDto, comment
            })

        }

        return comment;
    }

    async publicationsComment(publicationDto:PublicationComment){
        const comments = await this.commentRepo.publicationComment(publicationDto)
        return comments;
    }

    async search():Promise<CommentDocument[]>{
        const comments = await this.commentRepo.search();
        return comments;
    }
}