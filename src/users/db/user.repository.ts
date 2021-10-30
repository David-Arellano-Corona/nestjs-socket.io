import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { UserInput } from '../inputs';

import { FriendshipRepository } from '../../friendship/db/friendship.repository';

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(User.name) private userRepo: Model<UserDocument>,
        @Inject(forwardRef(() => FriendshipRepository)) private friendshipRepo: FriendshipRepository
    ) { }

    async createUser(userInput: UserInput) {
        const user = new this.userRepo(userInput);
        return await user.save()
    }

    async findByEmail(email: string): Promise<UserDocument> {
        const existUser = await this.userRepo.findOne({
            email: email
        })
        return existUser;
    }

    async findById(id: string) {
        const user = await this.userRepo.findOne({ _id: id })
        return user;
    }

    async getUsersPublications(userId:string){
        const user_id = Types.ObjectId(userId);
        const users = await this.userRepo.aggregate([
            {
                $lookup:{
                    from:'friendships',
                    localField:'_id',
                    foreignField:'friend',
                    as:'friendships'
                }
            },
            {
                $match:{ _id:{ $eq:user_id } }
            }
        ])

        const userIds = [];
        if(users.length){
            userIds.push(users[0]._id)
            for(let friend of users[0].friendships){
                userIds.push(friend.user);
            }
        }
        return userIds
    }

    async getSuggestions(userId: string) {
        const id = Types.ObjectId(userId);
        const users2 = await this.userRepo.aggregate([
            {
                $lookup: {
                    from: 'friendships',
                    localField: '_id',
                    foreignField: 'friend',
                    as: "friendships"
                },

            },
            {
                $match: { _id: { $ne: id }, friendships: { $size: 0 } }
            },
            {
                $project: {
                    _id:1,
                    id:"$_id",
                    name:1,
                    firstname:1,
                    email:1,
                    password:1,
                    date_of_birth:1,
                    gender :1,
                    __v:1
                  }
            }
        ])
        return users2 as UserDocument[];
    }

    async updateSocketId(userId:string, socketId:string){
        return this.userRepo.updateOne({_id:userId},{
            $set:{
                socketid:socketId
            }
        })
    }
}