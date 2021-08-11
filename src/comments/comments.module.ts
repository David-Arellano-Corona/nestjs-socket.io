import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './db/comment.schema';
import { CommentService } from './services/comment.service';
import { CommentResolver } from './resolvers/comment.resolver';
import { CommentRepository } from './db/comment.repository';

@Module({
    providers:[
        CommentResolver,
        CommentRepository,
        CommentService
    ],
    imports:[
        MongooseModule.forFeature([
            { name:Comment.name, schema: CommentSchema }
        ])
    ]
})
export class CommentsModule {}
