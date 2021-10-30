import { forwardRef, Injectable } from '@nestjs/common';
import { FriendshipRepository } from '../db/friendship.repository';
import { UserRepository } from '../../users/db/user.repository';
import { RoomsService } from '../../socket-handler/services/rooms.service';
import { FriendShipType } from '../types';
import { User, UserDocument } from '../../users/db/user.schema';
import { get_object_or_404, bad_request } from '../../common/utils';
import { MESSAGES } from '../../common/messages';

@Injectable()
export class FriendshipService{
    constructor(
        private friendshipRepository: FriendshipRepository,
        private userRepository: UserRepository,
        private roomsService: RoomsService
    ){}

    private async findUser(id:string):Promise<UserDocument>{
        const user = await this.userRepository.findById(id);
        return user;
    }

    private async existFriendship(user:User, friend:User){
        const friendship = await this.friendshipRepository.findFriendship(user, friend);
        bad_request(friendship, MESSAGES.FRIENDSHIP_ALREADY_EXIST)
    }

    private async createRooms(user:UserDocument, friend:UserDocument){
        const userRoom = `friendship${user.id}`;
        const friendRoom = `friendship${friend.id}`;
        await this.roomsService.createRoom(user, friendRoom);
        await this.roomsService.createRoom(friend, userRoom);

    }

    async createFriendship(friendshipTypes:FriendShipType){
        const user = await this.findUser(friendshipTypes.user);
        const friend = await this.findUser(friendshipTypes.friend);
        get_object_or_404(user, MESSAGES.USER_NOT_FOUND);
        get_object_or_404(friend, MESSAGES.USER_NOT_FOUND);
        await this.existFriendship(user,friend);

        const friendship = await this.friendshipRepository.createFriendship(friendshipTypes);
        await this.friendshipRepository.createFriendship({
            user: friendshipTypes.friend, friend:friendshipTypes.user
        })
        
        await this.createRooms(user, friend)
        
        return friendship;
    }
}