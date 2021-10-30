import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('PublicationLike')
export class PublicationLikeType{
    @Field()
    id:string;

    @Field()
    publication:string;

    @Field()
    user:string;
}