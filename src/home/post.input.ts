import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class PostInput {
    @Field(type => Int)
    postId:number
}