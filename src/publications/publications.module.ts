import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PublicationSchema, Publication as PublicationModel } from './db/publication.schema';
import { Publication } from './resolvers/publication.resolver';
import { PublicationRepository } from './db/publication.repository';
import { UsersModule } from '../users/users.module';
import { PublicationService } from './services/publication.service';

@Module({
    providers:[
        Publication, 
        PublicationRepository,
        PublicationService
    ],
    imports:[
        MongooseModule.forFeature([
            { name:PublicationModel.name, schema:PublicationSchema }
        ]),
        UsersModule
    ]
})
export class PublicationsModule {}
