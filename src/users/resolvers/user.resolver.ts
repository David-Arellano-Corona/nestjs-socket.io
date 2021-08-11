import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';
import { BadRequestException } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserInput } from '../inputs';
import { UserType } from '../types';


@Resolver(of => UserInput)
export class UserResolver{

    constructor(
        private userService:UserService
    ){}

    @Mutation(returns => UserType)
    async createUser(@Args('userInput') userInput:UserInput){
        const user = await this.userService.createUser(userInput);
        return user;
    }
}