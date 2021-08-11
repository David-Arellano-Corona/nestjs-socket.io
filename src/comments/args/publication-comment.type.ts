import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class PublicationComment{
    @Field()
    publicationId:string;
}