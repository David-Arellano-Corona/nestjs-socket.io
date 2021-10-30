import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserDocument } from 'src/users/db/user.schema';
import { Rooms, RoomsDocument } from './rooms.schema';

@Injectable()
export class RoomsRepository{
    constructor(
        @InjectModel(Rooms.name) private rooms: Model<RoomsDocument>
    ){}

    async createRoom(user:string, roomName:string){
        const room = await this.rooms.create({user, roomName})
        return room;
    }

    async findRoomsByUser(user:UserDocument){        
        const rooms = await this.rooms.find({user})
        return rooms;
    }

    async findRoomByUserAndRoom(user:UserDocument, roomName:string){
        const room = await this.rooms.findOne({ user, roomName });
        return room
    }

    async deleteRoom(user:UserDocument, roomName:string){
        await this.rooms.deleteOne({ user:user, roomName })
    }
}