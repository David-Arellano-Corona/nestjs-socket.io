import { Module, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JWT } from './jwt';

@Module({
    imports:[
        ConfigModule.forRoot({
            isGlobal: true
        }),
        JwtModule.register({
            secret:"process.env.JWT_SECRET"
        }),
    ],
    providers:[JWT],
    exports:[JWT]
})
export class GlobalModule{
    
}