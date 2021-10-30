import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('publication')
export class PublicationType{
    @Field()
    owner:string;

    @Field()
    text:string;

    @Field()
    createdAt:string;

    @Field()
    id:string;
}