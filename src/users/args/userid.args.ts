import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class UserId{
    @Field()
    userId:string
}