import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UserInput{
    @Field({ nullable:false })
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