import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ItemsService } from './items.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('items')
export class ItemsController {
  constructor(private service: ItemsService) {}

  @Get()            findAll()                            { return this.service.findAll(); }
  @Get('active')    findActive()                         { return this.service.findActive(); }
  @Get(':id')       findOne(@Param('id') id: string)     { return this.service.findOne(+id); }
  @Get('category/:cid') byCategory(@Param('cid') id: string) { return this.service.findByCategory(+id); }

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
