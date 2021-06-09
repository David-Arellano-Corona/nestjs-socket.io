import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorResolver } from './author.resolver';
import { HomeResolver } from './home.resolver';
import { Post, PostSchema } from './post.schema';
import { Author, AuthorSchema } from './author.schema';
import { HomeService } from './home.service';

@Module({
    providers:[HomeResolver, AuthorResolver, HomeService],
    imports:[
        MongooseModule.forFeature([
            { name: Post.name, schema:PostSchema },
            { name:Author.name, schema:AuthorSchema }
        ])
    ]
})
export class HomeModule {}
