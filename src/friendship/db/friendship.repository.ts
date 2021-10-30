import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Friendship, FriendshipDocument } from './friendship.schema';
import { User } from '../../users/db/user.schema';
import { FriendShipType } from '../types';

@Injectable()
export class FriendshipRepository{
    constructor(
        @InjectModel(Friendship.name) private friendshipRepository: Model<FriendshipDocument>
    ){}

    async createFriendship(friendshipType:FriendShipType){
        const friendship = await this.friendshipRepository.create(friendshipType)
        return friendship;
    }

    async findFriendship(user:User, friend:User):Promise<FriendshipDocument>{
        const friendship = await this.friendshipRepository.findOne({
            user, friend, isDeleted:false 
        }).exec()
        return friendship;
    }

    async  find(){
        const test = await this.friendshipRepository.find().populate('user')
    }


}