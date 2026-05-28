import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.item.findMany({
      include: { category: true },
      orderBy: [{ order: 'asc' }, { name: 'asc' }],
    });
  }

  findActive() {
    return this.prisma.item.findMany({
      where: { active: true },
      include: { category: true },
      orderBy: [{ order: 'asc' }, { name: 'asc' }],
    });
  }

  findByCategory(categoryId: number) {
    return this.prisma.item.findMany({
      where: { categoryId, active: true },
      orderBy: [{ order: 'asc' }, { name: 'asc' }],
    });
  }

  // Reordena uma lista de itens: o índice no array vira o campo `order`.
  async reorder(ids: number[]) {
    await this.prisma.$transaction(
      ids.map((id, index) =>
        this.prisma.item.update({ where: { id }, data: { order: index } }),
      ),
    );
    return { message: 'Ordem atualizada' };
  }

  async findOne(id: number) {
    const item = await this.prisma.item.findUnique({ where: { id }, include: { category: true } });
    if (!item) throw new NotFoundException('Item não encontrado');
    return item;
  }

  async create(data: any) {
    const { variants, ...rest } = data;
    const last = await this.prisma.item.findFirst({
      where: { categoryId: rest.categoryId ?? null },
      orderBy: { order: 'desc' },
      select: { order: true },
    });
    return this.prisma.item.create({
      data: {
        ...rest,
        order: (last?.order ?? -1) + 1,
        variantsJson: variants ? JSON.stringify(variants) : '[]',
      },
      include: { category: true },
    });
  }

  async update(id: number, data: any) {
    await this.findOne(id);
    const { variants, ...rest } = data;
    return this.prisma.item.update({
      where: { id },
      data: {
        ...rest,
        ...(variants !== undefined ? { variantsJson: JSON.stringify(variants) } : {}),
      },
      include: { category: true },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.item.delete({ where: { id } });
    return { message: 'Item removido' };
  }
}
