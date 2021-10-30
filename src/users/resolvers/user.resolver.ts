import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserService } from '../services/user.service';
import { SuggestionService } from '../services/suggestion.service';
import { UserInput } from '../inputs';
import { UserType } from '../types';
import { SuggestionArgs } from '../args';


@Resolver(of => UserInput)
export class UserResolver{

    constructor(
        private userService:UserService,
        private suggestionService:SuggestionService
    ){}

    @Mutation(returns => UserType)
    async createUser(@Args('userInput') userInput:UserInput){
        const user = await this.userService.createUser(userInput);
        return user;
    }

    @Query( returns => [UserType] )
    async suggestions(@Args() userId:SuggestionArgs){
        const users = await this.suggestionService.findSuggestions(userId.userId)
        return users;
    }
}