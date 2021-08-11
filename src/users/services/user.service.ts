import { Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { UserRepository } from '../db/user.repository';
import { UserInput } from '../inputs';
import { UserDocument } from '../db/user.schema';
import { MESSAGES } from '../../common/messages';

@Injectable()
export class UserService {
  private USER: UserInput;
  constructor(private userRepo: UserRepository) {}

  private async userSchema(user: UserInput) {
    this.USER = user;
    return this;
  }

  private async validateIfExit() {
    const userExist = await this.userRepo.findByEmail(this.USER.email);
    if (userExist) throw new ApolloError(MESSAGES.EMAIL_EXIST);
    return this;
  }

  private async register(): Promise<UserDocument> {
    const user = await this.userRepo.createUser(this.USER);
    return user;
  }

  async createUser(userInput: UserInput) {
    const user = await this.userSchema(userInput)
      .then((_) => this.validateIfExit())
      .then((_) => this.register());
    return user;
  }
}
