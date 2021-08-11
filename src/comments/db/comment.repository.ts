import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './comment.schema';
import { CommentInput } from '../inputs';
import { PublicationComment } from '../args';

@Injectable()
export class CommentRepository{
    constructor(
        @InjectModel(Comment.name)
        private commentRepo: Model<CommentDocument>
    ){
    }

    async createComment(commentDto: CommentInput){
        const comment = await this.commentRepo.create({...commentDto, createdAt: new Date()})
        return comment.save()
    }

    async search():Promise<CommentDocument[]>{
        const comments = await this.commentRepo.find().populate('owner');
        
        return comments
    }

    async publicationComment(publicationDto:PublicationComment):Promise<CommentDocument[]>{
        const comments = await this.commentRepo.find()
        .where({ publication: publicationDto.publicationId })
        .populate('owner');

        return comments;
    }
}