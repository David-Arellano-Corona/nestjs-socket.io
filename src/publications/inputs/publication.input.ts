import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class PublicationInput {
    @Field()
    text:string;

    @Field()
    owner:string;
}