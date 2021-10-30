import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PublicationLikeDocument, PublicationLike } from './publication-like.schema';
import { Publication } from './publication.schema';
import { User } from '../../users/db/user.schema';

@Injectable()
export class PublicationLikeRepository{
    constructor(
        @InjectModel(PublicationLike.name) private publicationLikeSchema: Model<PublicationLikeDocument>
    ){}

    async getPublicationLikesFromPublication(publication:Publication){
        const likes = await this.publicationLikeSchema.find({
            publication
        }).populate('user')

        return likes;
    }    

    async getPublicationLike(publication:Publication, user:User){
        const existPublication = await this.publicationLikeSchema.findOne({
            publication: publication,
            user: user
        })
        return existPublication
    }

    async createPublicationLike(publication:Publication, user:User){
        const pub = await this.publicationLikeSchema.create({
            publication: publication,
            user: user
        })
        return pub;
    }

    async deletePublicationLike(publication:Publication, user:User){
        const pub = await this.publicationLikeSchema.deleteOne({
            publication,user
        })

        return pub;
    }
}