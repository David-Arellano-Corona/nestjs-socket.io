import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class PublicationDetail{
    @Field()
    publicationId:string;
}