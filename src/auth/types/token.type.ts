import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('token')
export class TokenSchema{
    @Field()
    token:string;
}