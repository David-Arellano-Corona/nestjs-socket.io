import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class FriendShipType {
    @Field()
    user:string;

    @Field()
    friend:string;
}