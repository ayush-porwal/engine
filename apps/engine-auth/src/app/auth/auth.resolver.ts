import { Request, Response } from 'express';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { LoginInput } from './dto/login.dto';
import { User } from '../users/models/user.model';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Mutation(() => User)
  async login(
    @Args('loginInput') loginInput: LoginInput,
    @Context() context: { req: Request; res: Response },
  ) {
    return this.authService.login(loginInput, context.res);
  }
}
