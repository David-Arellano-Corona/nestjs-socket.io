import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class PostCreateInput{
    @Field()
    title:string;

    @Field(type=> Int)
    votes:number;

    @Field()
    authorId:string;
}