import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { SocketHandlerModule } from '../socket-handler/socket-handler.module';
import { FriendshipResolver } from './resolvers/friendship.resolver';
import { Friendship, FriendshipSchema } from './db/friendship.schema';
import { Rooms, RoomSchema } from '../common/db/rooms.schema';
import { FriendshipService } from './services/friendship.service';
import { FriendshipRepository } from './db/friendship.repository';
import { RoomsRepository } from '../common/db/rooms.repository';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Friendship.name, schema: FriendshipSchema },
            { name: Rooms.name, schema: RoomSchema }
        ]),
        forwardRef(() => UsersModule),
        forwardRef(() => SocketHandlerModule)
    ],
    providers: [
        FriendshipResolver,
        FriendshipService,
        FriendshipRepository,
        RoomsRepository
    ],
    exports: [
        FriendshipService,
        FriendshipRepository
    ]
})
export class FriendshipModule { }
