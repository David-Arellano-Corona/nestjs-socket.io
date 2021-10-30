import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SocketHandlerModule } from '../socket-handler/socket-handler.module';
import { UsersModule } from '../users/users.module';
import { GlobalModule } from '../common/global.module';
import { SessionGuard } from '../common/session.guard';
import { PublicationSchema, Publication as PublicationModel } from './db/publication.schema';
import { PublicationLikeSchema, PublicationLike } from './db/publication-like.schema';
import { Publication } from './resolvers/publication.resolver';
import { PublicationRepository } from './db/publication.repository';
import { PublicationLikeRepository } from './db/publication-like.repository';
import { PublicationService } from './services/publication.service';
import { PublicationLikeService } from './services/publication-like.service';



@Module({
    providers:[
        Publication, 
        SessionGuard,
        PublicationRepository,
        PublicationLikeRepository,
        PublicationService,
        PublicationLikeService
    ],
    imports:[
        MongooseModule.forFeature([
            { name:PublicationModel.name, schema:PublicationSchema },
            { name:PublicationLike.name , schema: PublicationLikeSchema }
        ]),
        UsersModule,
        GlobalModule,
        SocketHandlerModule
    ], 
    exports:[
        PublicationRepository
    ]
})
export class PublicationsModule {}
