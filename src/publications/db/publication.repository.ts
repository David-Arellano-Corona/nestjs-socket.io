import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Publication, PublicationDocument } from './publication.schema';
import { UserRepository } from '../../users/db/user.repository';
import { PublicationInput } from '../inputs/';

@Injectable()
export class PublicationRepository {
    constructor(
        @InjectModel(Publication.name) private pubModel: Model<PublicationDocument>,
        private userRepo: UserRepository
    ){}

    async createPublication(publication:PublicationInput){
        const pub = new this.pubModel(publication);
        return pub.save()
    }

    async search(){
        const pubs = await this.pubModel.find().populate('owner');
        return pubs;
    }

    async find(id:string):Promise<PublicationDocument>{
        const pub = await this.pubModel.findOne({_id:id}).populate('owner')
        return pub;
    }
}
