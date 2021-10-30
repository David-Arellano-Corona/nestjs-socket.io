/**
 * https://wanago.io/2021/01/25/api-nestjs-chat-websockets/
 * https://github.com/nestjs/nest/blob/master/sample/02-gateways/src/events/events.gateway.ts 
 */
import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from './services/socket.service';
import { SocketHandlerService } from './services/socket-handler.service';

@WebSocketGateway(3333,{
  cors:{
    origin:'*'
  }
})
export class SocketGateway implements OnGatewayConnection {

  @WebSocketServer()
  server:Server

  constructor(
    private socketService: SocketService,
    private socketHandlerService: SocketHandlerService
  ){}

  async handleConnection(socket:Socket){
    this.socketService.setSocket(socket);
  }


  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log("Recibi el mensaje")
    return 'Hello world!';
  }

  //refresca el socket cuando se regresa a la aplicación sin hacer login
  @SubscribeMessage("refresh-socket")
  async refreshSocket(socket:Socket, payload:any){
    const userId = payload.userId;
    const socketId = socket.id;
    await this.socketHandlerService.refreshSocketId(userId, socketId);
    await this.socketHandlerService.joinRooms(userId, socketId)
  }
}
