import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TokenSchema } from '../types';
import { LoginInput } from '../inputs';
import { AuthService } from '../services/auth.service';

@Resolver(of => TokenSchema)
export class LoginResolver{

    constructor(
        private authService: AuthService
    ){}

    @Query(returns => TokenSchema)
    test(){
        return {token:''}
    }
    
    @Mutation(returns => TokenSchema)
    async login(@Args('loginInput') loginInput:LoginInput){
        
        const jwt = await this.authService.login(loginInput)
        return jwt;
    }

}