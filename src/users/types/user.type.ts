import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('user')
export class UserType{
    @Field()
    id:string;

    @Field()
    name:string;

    @Field()
    firstname:string;

    @Field()
    email:string;

    @Field()
    password:string;

    @Field()
    date_of_birth:Date;

    @Field()
    gender:string;
}