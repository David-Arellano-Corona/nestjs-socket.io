import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class PublicationLikeInput{
    @Field()
    publicationId:string;

    @Field()
    userId:string
}