import { InputType, Field } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator'

@InputType()
export class FriendshipInput{
    @Field()
    @IsMongoId()
    user:string;

    @Field()
    @IsMongoId()
    friend:string;
}