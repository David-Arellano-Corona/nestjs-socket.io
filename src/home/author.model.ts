import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Post } from './post.model';

@ObjectType()
export class Author{
    @Field(type => ID)
    id:string;

    @Field({ nullable:true })
    firstName?:string;

    @Field({ nullable:true })
    lastName:string;

    @Field(type => [Post])
    posts: Post[];
}