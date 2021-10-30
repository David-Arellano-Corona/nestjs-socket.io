import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from '../users/users.module';
import { SocketHandlerService } from './services/socket-handler.service';
import { SocketGateway } from './socket.gateway';
import { SocketService } from './services/socket.service';
import { RoomsRepository } from '../common/db/rooms.repository';
import { Rooms, RoomSchema } from '../common/db/rooms.schema';
import { RoomsService } from './services/rooms.service';

@Module({
    imports: [
        forwardRef(() => UsersModule),
        MongooseModule.forFeature([
            {name:Rooms.name, schema: RoomSchema}
        ])
    ],
    providers: [
        SocketHandlerService,
        SocketGateway,
        SocketService, 
        RoomsRepository,
        RoomsService
    ],
    exports: [
        SocketHandlerService,
        SocketService,
        SocketGateway, 
        RoomsService
    ]
})
export class SocketHandlerModule { }
