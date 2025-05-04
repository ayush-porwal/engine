import { hash } from 'bcrypt';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [User], { name: 'users' })
  async getUsers() {
    return this.usersService.findAll();
  }

  @Mutation(() => User, { name: 'createUser' })
  async createUser(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const passwordHash = await hash(password, 10);
    return this.usersService.createUser({
      email,
      password: passwordHash,
    });
  }
}
