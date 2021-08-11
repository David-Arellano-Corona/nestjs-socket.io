import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginResolver } from './resolvers';
import { GlobalModule } from '../common/global.module';
import { JWT } from '../common/jwt';
import { User, UserSchema } from '../users/db/user.schema';
import { AuthService } from './services/auth.service';
import { UserRepository } from '../users/db/user.repository';



@Module({
    
    imports:[
        MongooseModule.forFeature([
            { name:User.name, schema:UserSchema }
        ]),
        GlobalModule  
    ],
    providers:[LoginResolver, AuthService, UserRepository],
})
export class AuthModule {}
