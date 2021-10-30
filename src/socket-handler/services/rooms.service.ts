import { Injectable } from '@nestjs/common';
import { SocketService } from './socket.service';
import { RoomsRepository } from '../../common/db/rooms.repository';
import { UserDocument } from '../../users/db/user.schema';

@Injectable()
export class RoomsService{
    constructor(
        private roomsRepository:RoomsRepository,
        private socketService:SocketService
    ){}

    async createRoom(user:UserDocument, roomName:string){
        const room = await this.roomsRepository.createRoom(user.id, roomName)
        
        const socketId = user.socketid;
        const socket = this.socketService.getSocket(socketId) 
        if(socket){
            this.socketService.getSocket(socketId).join(roomName)
            
        }
        return room;
    }

    async deleteRoom(user:UserDocument, roomName:string){
        await this.roomsRepository.deleteRoom(user, roomName);
    }
}