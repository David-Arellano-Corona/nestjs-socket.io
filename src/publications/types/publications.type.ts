import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UserInfo{
    @Field()
    id:string;
    
    @Field()
    name:string;

    @Field()
    firstname:string;

    @Field()
    email:string;

    @Field()
    date_of_birth:string;
}


@ObjectType()
export class PublicationsType{
    @Field()
    id:string;
    
    @Field() 
    text:string;

    @Field()
    createdAt:Date;

    @Field(type => UserInfo)
    owner:UserInfo;
}