import { Injectable } from '@nestjs/common';
import { SocketService } from './socket.service';
import { UserRepository } from '../../users/db/user.repository';
import { RoomsRepository } from '../../common/db/rooms.repository';
import { RoomsDocument } from 'src/common/db/rooms.schema';

@Injectable()
export class SocketHandlerService {
    constructor(
        private userRepository: UserRepository,
        private roomRepository: RoomsRepository,
        private socketService: SocketService
    ) { }

    async refreshSocketId(userId:string, socketId:string){
        const user = await this.userRepository.updateSocketId(userId, socketId)
        
        return user;
    }

    private joinToRoom(rooms:RoomsDocument[], socketId:string){
        const socket = this.socketService.getSocket(socketId);
        if(!socket) return
        for(let room of rooms){
            const roomName = room.roomName;
            socket.join(roomName)
        }
    }

    async joinRooms(userId:string, socketId:string){
        const user = await this.userRepository.findById(userId)
        const rooms = await this.roomRepository.findRoomsByUser(user);
        this.joinToRoom(rooms, socketId);
    }

    emitToRoom(roomName:string, event:string, payload:any){
        this.socketService.getSockets().to(roomName).emit(event, payload);
    }
}