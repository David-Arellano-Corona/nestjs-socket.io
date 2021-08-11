import { ObjectType, Field } from '@nestjs/graphql';
import { UserInfo } from '../../publications/types/publications.type'


@ObjectType()
export class Comment {
    @Field()
    owner:string;

    @Field()
    createdAt:Date

    @Field()
    comment:string
}