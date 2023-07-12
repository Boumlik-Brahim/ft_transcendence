import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Get(':id')
  // getMyUser(@Param() params: {id: string}) {
  //   return this.usersService.getUser(params.id);
  // }

  // @Get()
  // getMyUsers() {
  //   return this.usersService.getUsers();
  // }
}
