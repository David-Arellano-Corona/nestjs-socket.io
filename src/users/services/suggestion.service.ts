import { Injectable } from '@nestjs/common';
import { UserRepository } from '../db/user.repository';

@Injectable()
export class SuggestionService{
    constructor(
        private userRepository:UserRepository
    ){}

    async findSuggestions(userId:string){
        const users = await this.userRepository.getSuggestions(userId)
        return users;
    }
}