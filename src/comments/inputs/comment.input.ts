import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CommentInput{
    @Field()
    owner:string;

    @Field()
    comment:string;

    @Field()
    publication:string;
}