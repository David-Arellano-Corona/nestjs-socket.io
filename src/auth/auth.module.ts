import { Module, forwardRef } from '@nestjs/common';
import { LoginResolver } from './resolvers';
import { GlobalModule } from '../common/global.module';
import { UsersModule } from '../users/users.module';
import { SocketHandlerModule } from '../socket-handler/socket-handler.module';
import { AuthService } from './services/auth.service';



@Module({

    imports: [
        GlobalModule,
        forwardRef(() => UsersModule),
        forwardRef(() => SocketHandlerModule)
    ],
    providers: [
        LoginResolver,
        AuthService,
    ],
})
export class AuthModule { }
