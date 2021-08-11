import { Injectable } from '@nestjs/common';
import { CommentRepository } from '../db/comment.repository';
import { CommentDocument } from '../db/comment.schema';
import { CommentInput } from '../inputs';
import { PublicationComment } from '../args';

@Injectable()
export class CommentService{
    constructor(
        private commentRepo: CommentRepository
    ){}

    async createComment(commentDto: CommentInput):Promise<CommentDocument>{
        const comment = await this.commentRepo.createComment(commentDto)
        return comment;
    }

    async publicationsComment(publicationDto:PublicationComment){
        const comments = await this.commentRepo.publicationComment(publicationDto)
        return comments;
    }

    async search():Promise<CommentDocument[]>{
        const comments = await this.commentRepo.search();
        return comments;
    }
}