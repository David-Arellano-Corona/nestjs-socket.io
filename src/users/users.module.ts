import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserResolver } from './resolvers/user.resolver';
import { UserService } from './services/user.service';
import { SuggestionService } from './services/suggestion.service';
import { UserRepository } from './db/user.repository';
import { User, UserSchema } from './db/user.schema';

import { FriendshipModule } from '../friendship/friendship.module';

@Module({
    providers: [
        UserResolver,
        UserService,
        SuggestionService,
        UserRepository
    ],
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema }
        ]),
        forwardRef(() => FriendshipModule)
    ],
    exports: [UserRepository]
})
export class UsersModule { }
