import { Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { UserInput } from '../inputs';

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(User.name) private userRepo:Model<UserDocument>
    ){}

    async createUser(userInput:UserInput){
        const user = new this.userRepo(userInput);
        return await user.save()
    }

    async findByEmail(email:string):Promise<UserDocument>{
        const existUser = await this.userRepo.findOne({
            email:email
        })
        return existUser;
    }

    async findById(id:string){
        const user = await this.userRepo.findOne({ _id:id })
        return user;
    }
}