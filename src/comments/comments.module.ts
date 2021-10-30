import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { PublicationsModule } from '../publications/publications.module';
import { SocketHandlerModule } from '../socket-handler/socket-handler.module';
import { Comment, CommentSchema } from './db/comment.schema';
import { CommentService } from './services/comment.service';
import { CommentResolver } from './resolvers/comment.resolver';
import { CommentRepository } from './db/comment.repository';
import { RoomsRepository } from 'src/common/db/rooms.repository';
import { RoomSchema, Rooms } from '../common/db/rooms.schema';


@Module({
    providers:[
        CommentResolver,
        CommentRepository,
        CommentService,
        RoomsRepository
    ],
    imports:[
        MongooseModule.forFeature([
            { name:Comment.name, schema: CommentSchema },
            { name:Rooms.name, schema:RoomSchema }
        ]),
        UsersModule,
        PublicationsModule, 
        SocketHandlerModule
    ]
})
export class CommentsModule {}
