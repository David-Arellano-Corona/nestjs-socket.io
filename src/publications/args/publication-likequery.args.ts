import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class PublicationLikeQueryArgs{
    @Field()
    publicationId:string
}