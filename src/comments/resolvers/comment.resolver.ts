import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CommentService } from '../services/comment.service';
import { Comment, CommentResponse } from '../types';
import { CommentInput } from '../inputs';
import { PublicationComment } from '../args';

@Resolver(of => Comment)
export class CommentResolver{

    constructor(
        private commentService: CommentService
    ){}

    @Query(returns => [CommentResponse])
    async comments(){
        const comments = await this.commentService.search()
        
        return comments;
    }

    @Query(returns => [CommentResponse])
    async publicationComment(@Args() publicationDto:PublicationComment ){
        const comments = await this.commentService.publicationsComment(publicationDto);
        return comments;
    }

    @Mutation(returns => Comment )
    async createComment(@Args('comment') commentDto: CommentInput){
        const comment = await this.commentService.createComment(commentDto);
        return comment;
    }
}