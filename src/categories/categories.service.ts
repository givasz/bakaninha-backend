import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.category.findMany({ orderBy: [{ order: 'asc' }, { name: 'asc' }] });
  }

  findActive() {
    return this.prisma.category.findMany({
      where: { active: true },
      orderBy: [{ order: 'asc' }, { name: 'asc' }],
    });
  }

  async findOne(id: number) {
    const cat = await this.prisma.category.findUnique({ where: { id } });
    if (!cat) throw new NotFoundException('Categoria não encontrada');
    return cat;
  }

  create(data: { name: string; description?: string; imageUrl?: string | null; order?: number; active?: boolean }) {
    return this.prisma.category.create({ data });
  }

  async update(id: number, data: any) {
    await this.findOne(id);
    return this.prisma.category.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.category.delete({ where: { id } });
    return { message: 'Categoria removida' };
  }
}
