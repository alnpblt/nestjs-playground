import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ListUserDto } from './dto/list-user.dto';
import { ListUserPipe } from './pipes/list.user.pipe';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  // @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async handleCreateUserRoute(@Body() createUserDto: CreateUserDto) {
    // createUserDto.role_id = 1;
    return this.userService.createUser(createUserDto);
  }

  @Get()
  async handleGetUserListRoute(
    @Query(ListUserPipe) userListFilter: ListUserDto,
  ) {
    return this.userService.getUserList(userListFilter);
  }
}
