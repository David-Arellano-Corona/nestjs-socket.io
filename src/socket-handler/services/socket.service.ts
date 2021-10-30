import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class SocketService{
    private socket:Socket;
    
    setSocket(socket:Socket){
        this.socket = socket;
    }

    getSocketId(){
        return this.socket.id
    }

    getSockets(){
        return this.socket.nsp
    }
    // con la propiedad nsp podemos acceder a cada uno de los sockets que socket.io esta gestionando
    getSocket(id:string){
        let socket = this.socket.nsp.sockets.get(id)
        return socket
    }


}