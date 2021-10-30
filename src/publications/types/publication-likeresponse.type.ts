import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
class User{
    @Field()
    name:string;

    @Field()
    firstname:string;

    @Field()
    id:string
}

@ObjectType()
export class PublicationLikeResponseType{
    @Field()
    id:string;

    @Field()
    publication:string;

    @Field(type => User)
    user:User
}