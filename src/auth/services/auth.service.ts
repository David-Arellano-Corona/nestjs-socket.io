import { Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { LoginInput } from '../inputs';
import { JWT } from '../../common/jwt';
import { TokenSchema } from '../types';
import { MESSAGES } from '../../common/messages';
import { Password } from '../../common/password.hash';
import { SocketService } from '../../socket-handler/services/socket.service';
import { SocketHandlerService } from '../../socket-handler/services/socket-handler.service';
import { UserDocument } from '../..//users/db/user.schema';
import { UserRepository } from '../../users/db/user.repository';



@Injectable()
export class AuthService {
    private USER:UserDocument;
    private USER_INPUT:LoginInput;

    constructor(
        private socketService: SocketService,
        private socketHandlerService: SocketHandlerService,
        private userRepo:UserRepository,
        private jwt:JWT
    ){}

    private async generateJWT():Promise<string>{

        const token = this.jwt.encode({
            id: this.USER._id,
            name: this.USER.name,
            firstname: this.USER.firstname,
            email: this.USER.email,
            gender: this.USER.gender
        });
        return token;
    }    

    private async comparePassword(){
        const hash = new Password()
        .compare(
            this.USER_INPUT.password,
            this.USER.password
        )
        if(!hash) throw new ApolloError(MESSAGES.USER_NOT_FOUND_AUTH)

    }    

    private async validateUserExist(){
        if(!this.USER) throw new ApolloError(MESSAGES.USER_NOT_FOUND_AUTH)
        return this;
    }
    private async retrieve(){
        const user = await this.userRepo.findByEmail(this.USER_INPUT.email);
        this.USER = user;
        return this;
    }

    private async UserSchema(loginInput:LoginInput){
        this.USER_INPUT = loginInput;
        return this;
    }

    private async refreshSocket(){
        const userId = this.USER.id;
        const socketId = this.socketService.getSocketId()
        await this.socketHandlerService.refreshSocketId(userId, socketId);
    }

    async login(loginInput:LoginInput):Promise<TokenSchema>{
        const jwt = await this.UserSchema(loginInput)
        .then(_=> this.retrieve())
        .then(_=> this.validateUserExist())
        .then(_=> this.comparePassword())
        .then(_=> this.refreshSocket())
        .then(_=> this.generateJWT());
        return { token:jwt }
    }
}