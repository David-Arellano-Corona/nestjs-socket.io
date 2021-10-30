import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class SuggestionArgs{
    @Field()
    userId:string
}