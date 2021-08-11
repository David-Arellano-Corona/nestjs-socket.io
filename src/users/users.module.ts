import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserResolver } from './resolvers/user.resolver';
import { UserService } from './services/user.service';
import { UserRepository } from './db/user.repository';
import { User, UserSchema } from './db/user.schema';

@Module({
    providers:[UserResolver, UserService, UserRepository],
    imports:[
        MongooseModule.forFeature([
            { name:User.name, schema:UserSchema }
        ])
    ],
    exports:[ UserRepository ]
})
export class UsersModule {}
