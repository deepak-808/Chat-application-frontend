import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  BadRequestException,
  ValidationPipe,
} from '@nestjs/common';
import { CatService } from './cat.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Controller('cat')
export class CatController {
  constructor(private readonly catService: CatService) {}
  @Get()
  findAll(@Query('role') role?: 'INTERN' | 'ADMIN' | 'ENGINEER' | 'USER') {
    if (role !== undefined) {
      const uppercaseRole = role.toUpperCase();
      if (!['INTERN', 'ADMIN', 'ENGINEER', 'USER'].includes(uppercaseRole)) {
        throw new BadRequestException('Invalid role parameter');
      }
      return this.catService.findAll(
        uppercaseRole as 'INTERN' | 'ADMIN' | 'ENGINEER' | 'USER',
      );
    }
    return this.catService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.catService.findOne(id);
  }

  @Post()
  create(
    @Body(ValidationPipe)
    createCatDto: CreateCatDto,
  ) {
    return this.catService.create(createCatDto);
  }

  @Patch(':id')
  updateOne(
    @Param('id', ParseIntPipe)
    id: number,
    @Body(ValidationPipe)
    updateCatDto: UpdateCatDto,
  ) {
    return this.catService.updateOne(id, updateCatDto);
  }

  @Delete(':id')
  findOneDelete(@Param('id', ParseIntPipe) id: number) {
    return this.catService.findOneDelete(id);
  }
}
