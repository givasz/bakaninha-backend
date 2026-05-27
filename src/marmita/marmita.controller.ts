import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { MarmitaService } from './marmita.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('marmita')
export class MarmitaController {
  constructor(private service: MarmitaService) {}

  // ── Sizes ─────────────────────────────────────────────
  @Get('sizes')
  getAllSizes() { return this.service.getAllSizes(); }

  @Get('sizes/active')
  getActiveSizes() { return this.service.getActiveSizes(); }

  @Get('sizes/:id')
  getSizeWithGroups(@Param('id') id: number) {
    return this.service.getSizeWithGroups(+id);
  }

  @Post('sizes')
  @UseGuards(JwtAuthGuard)
  createSize(@Body() body: any) { return this.service.createSize(body); }

  @Put('sizes/:id')
  @UseGuards(JwtAuthGuard)
  updateSize(@Param('id') id: number, @Body() body: any) {
    return this.service.updateSize(+id, body);
  }

  @Delete('sizes/:id')
  @UseGuards(JwtAuthGuard)
  removeSize(@Param('id') id: number) { return this.service.removeSize(+id); }

  // ── Item Groups (global) ──────────────────────────────
  @Get('item-groups')
  getAllItemGroups() { return this.service.getAllItemGroups(); }

  @Post('item-groups')
  @UseGuards(JwtAuthGuard)
  createItemGroup(@Body() body: any) { return this.service.createItemGroup(body); }

  @Put('item-groups/:id')
  @UseGuards(JwtAuthGuard)
  updateItemGroup(@Param('id') id: number, @Body() body: any) {
    return this.service.updateItemGroup(+id, body);
  }

  @Delete('item-groups/:id')
  @UseGuards(JwtAuthGuard)
  removeItemGroup(@Param('id') id: number) { return this.service.removeItemGroup(+id); }

  // ── Size↔Group links ──────────────────────────────────
  @Post('size-groups')
  @UseGuards(JwtAuthGuard)
  upsertSizeGroup(@Body() body: any) {
    return this.service.upsertSizeGroup({
      marmitaSizeId: +body.marmitaSizeId,
      itemGroupId: +body.itemGroupId,
      maxChoices: +body.maxChoices,
      required: !!body.required,
      order: +body.order,
    });
  }

  @Delete('size-groups/:sizeId/:itemGroupId')
  @UseGuards(JwtAuthGuard)
  removeSizeGroup(@Param('sizeId') sizeId: number, @Param('itemGroupId') itemGroupId: number) {
    return this.service.removeSizeGroup(+sizeId, +itemGroupId);
  }

  // ── Items (global) ────────────────────────────────────
  @Get('items')
  getAllItems() { return this.service.getAllItems(); }

  @Post('items')
  @UseGuards(JwtAuthGuard)
  createItem(@Body() body: any) { return this.service.createItem(body); }

  @Put('items/:id')
  @UseGuards(JwtAuthGuard)
  updateItem(@Param('id') id: number, @Body() body: any) {
    return this.service.updateItem(+id, body);
  }

  @Delete('items/:id')
  @UseGuards(JwtAuthGuard)
  removeItem(@Param('id') id: number) { return this.service.removeItem(+id); }
}
