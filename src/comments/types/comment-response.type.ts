import { ObjectType, Field } from '@nestjs/graphql';
import { UserInfo } from '../../publications/types/publications.type';

@ObjectType()
export class CommentResponse{
    @Field(type => UserInfo)
    owner:UserInfo;

    @Field()
    createdAt:string;

    @Field()
    comment:string;

    @Field()
    id:string;
}