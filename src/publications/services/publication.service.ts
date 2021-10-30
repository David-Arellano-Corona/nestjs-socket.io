import { Injectable } from '@nestjs/common';
import { SocketHandlerService } from '../../socket-handler/services/socket-handler.service';
import { RoomsService } from '../../socket-handler/services/rooms.service';
import { PublicationDocument } from '../db/publication.schema';
import { PublicationRepository } from '../db/publication.repository';
import { UserRepository } from '../../users/db/user.repository';
import { PublicationInput } from '../inputs';
import { PublicationDetail } from '../args';
import { SocketEvents, SocketRooms } from '../../common/socket-events';


@Injectable()
export class PublicationService{
    constructor(
        private pubRepo: PublicationRepository,
        private socketHandlerService: SocketHandlerService,
        private roomService: RoomsService,
        private userRepository:UserRepository
    ){
    }

    async create(publication:PublicationInput){
        const pub = await this.pubRepo.createPublication(publication);
        
        const user = await this.userRepository.findById(publication.owner);
        console.log(`publication${pub._id}`)
        await this.roomService.createRoom(user, `publication${pub._id}`)
        
        this.socketHandlerService.emitToRoom(
            `${SocketRooms.FRIENDSHIP}${publication.owner}`,
            SocketEvents.NEW_PUBLICATION,
            pub
        );
        return pub;
    }

    async search(userId:string){
        const pubs = await this.pubRepo.search(userId);
        return pubs;
    }

    async find(pubDto:PublicationDetail):Promise<PublicationDocument>{
        const pub = await this.pubRepo.find(pubDto.publicationId);
        return pub;
    }
}