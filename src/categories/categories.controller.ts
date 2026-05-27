import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('categories')
export class CategoriesController {
  constructor(private service: CategoriesService) {}

  @Get()        findAll()  { return this.service.findAll(); }
  @Get('active') findActive() { return this.service.findActive(); }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() body: any) { return this.service.create(body); }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() body: any) { return this.service.update(+id, body); }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) { return this.service.remove(+id); }
}
