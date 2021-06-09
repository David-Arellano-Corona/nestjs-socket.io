import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class Post {
    @Field( type => ID)
    id:number;

    @Field()
    title:string;

    @Field(type => Int, { nullable:true })
    votes?:number;
}