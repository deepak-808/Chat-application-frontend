import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body(ValidationPipe) createUserDto: Prisma.UserCreateInput) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Query('role') role?: 'INTERN' | 'ADMIN' | 'ENGINEER' | 'USER') {
    if (role !== undefined) {
      const uppercaseRole = role.toUpperCase();
      if (!['INTERN', 'ADMIN', 'ENGINEER', 'USER'].includes(uppercaseRole)) {
        throw new BadRequestException('Invalid role parameter');
      }
      return this.userService.findAll(
        uppercaseRole as 'INTERN' | 'ADMIN' | 'ENGINEER' | 'USER',
      );
    }
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id')
    id: string,
    @Body(ValidationPipe)
    updateUserDto: Prisma.UserUpdateInput,
  ) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
