import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/providers/database/prisma/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { ListUserDto } from './dto/list-user.dto';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<Prisma.usersCreateInput> {
    this.logger.log('createUser');
    return this.prismaService.users.create({
      data: {
        ...createUserDto,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
    });
  }

  async getUserList(
    filter: ListUserDto,
  ): Promise<Omit<Prisma.usersGetPayload<object>, 'password'>[]> {
    const where: Prisma.usersWhereInput = {
      deleted_at: null,
    };
    if (filter.id !== undefined) {
      where.id = filter.id;
    }
    if (filter.email !== undefined && filter.email) {
      where.email = filter.email;
    }
    if (filter.role_id !== undefined) {
      where.role_id = filter.role_id;
    }
    if (filter.created_from !== undefined && filter.created_from) {
      where.created_at = { gte: filter.created_from };
      if (filter.created_to !== undefined && filter.created_to) {
        where.created_at['lte'] = filter.created_to;
      }
    }
    return this.prismaService.users.findMany({
      omit: {
        password: true,
      },
      include: { role: true },
      where: where,
    });
  }
}
