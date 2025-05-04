import { Injectable } from '@nestjs/common';
import { Prisma } from '../../../generated/prisma-client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll() {
    return this.prismaService.user.findMany();
  }

  async getUser(args: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.findUniqueOrThrow({
      where: args,
    });
  }

  async createUser(args: Prisma.UserCreateInput) {
    return this.prismaService.user.create({
      data: args,
    });
  }
}
