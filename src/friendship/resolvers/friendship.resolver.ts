import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { FriendshipService } from '../services/friendship.service';
import { FriendShipType } from '../types';
import { FriendshipInput } from '../inputs';

@Resolver(of => FriendShipType)
export class FriendshipResolver{

    constructor(
        private friendshipService:FriendshipService
    ){}

    @Mutation( returns => FriendShipType)
    async createFriendship(@Args('friendshipType') friendshipType:FriendshipInput){
        const res = await this.friendshipService.createFriendship(friendshipType)
        return res;
    }
}