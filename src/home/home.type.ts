import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType('Home')
export class HomeType{
    @Field(type => ID)
    id:String;

    @Field()
    name:String;
}