import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class PublicationLikeArgs{
    @Field()
    publicationId:string;

    @Field()
    userId:string;
}