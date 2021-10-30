import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JWT } from '../common/jwt';
import { UserRepository } from '../users/db/user.repository';

@Injectable()
export class SessionGuard implements CanActivate{

    constructor(
        private jwtService:JWT,
        private userRepository: UserRepository
    ){}

    private async userInfo(token:string){
        const decode = this.jwtService.decode(token);
        const user = await this.userRepository.findById(decode.id) 
        return user;
    }

    async canActivate(ctx:ExecutionContext):Promise<boolean>{
        const context = GqlExecutionContext.create(ctx);
        const bearer = context.getContext().req.headers['authorization'] as string
        const authorization = !bearer ? '': bearer.split(" ").pop()
        if(!authorization) return false;

        const user = await this.userInfo(authorization)
        context.getContext().user = user
        return true;
    }
}