import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MarmitaService {
  constructor(private prisma: PrismaService) {}

  // ── Sizes ────────────────────────────────────────────────
  getAllSizes() {
    return this.prisma.marmitaSize.findMany({ orderBy: [{ order: 'asc' }, { price: 'asc' }] });
  }
  getActiveSizes() {
    return this.prisma.marmitaSize.findMany({
      where: { active: true },
      orderBy: [{ order: 'asc' }, { price: 'asc' }],
    });
  }

  /**
   * Returns a MarmitaSize with the full tree of groups + items
   * filtered for what should appear in this size:
   *   - itemGroups that have a SizeGroup linking them to this size
   *   - items in that itemGroup that are active AND (allowedSizes empty OR contains this size)
   */
  async getSizeWithGroups(id: number) {
    const size = await this.prisma.marmitaSize.findUnique({ where: { id } });
    if (!size) throw new NotFoundException('Tamanho não encontrado');

    const sizeGroups = await this.prisma.marmitaSizeGroup.findMany({
      where: { marmitaSizeId: id },
      include: { itemGroup: true },
      orderBy: { order: 'asc' },
    });

    const groups = await Promise.all(
      sizeGroups.map(async sg => {
        const items = await this.prisma.marmitaItem.findMany({
          where: { itemGroupId: sg.itemGroupId, active: true },
          orderBy: [{ order: 'asc' }, { name: 'asc' }],
        });
        const filtered = items.filter(it => {
          let allowed: number[] = [];
          try { allowed = JSON.parse(it.allowedSizesJson || '[]'); } catch {}
          return allowed.length === 0 || allowed.includes(id);
        });
        return {
          id: sg.id,
          name: sg.itemGroup.name,
          itemGroupId: sg.itemGroupId,
          maxChoices: sg.maxChoices,
          required: sg.required,
          order: sg.order,
          groupItems: filtered.map(it => ({
            id: it.id,
            name: it.name,
            imageUrl: it.imageUrl,
            extraPrice: it.extraPrice,
            active: it.active,
          })),
        };
      }),
    );

    return { ...size, groups };
  }

  createSize(data: { name: string; price: number; active?: boolean; order?: number }) {
    return this.prisma.marmitaSize.create({ data });
  }
  updateSize(id: number, data: any) {
    return this.prisma.marmitaSize.update({ where: { id }, data });
  }
  async removeSize(id: number) {
    await this.prisma.marmitaSize.delete({ where: { id } });
    return { message: 'Tamanho removido' };
  }

  // ── Item Groups (global) ─────────────────────────────────
  /**
   * List all global item groups. Includes for each: its size-group
   * links (so admin can see "Proteína is used in P/M/G") and items.
   */
  getAllItemGroups() {
    return this.prisma.marmitaItemGroup.findMany({
      include: {
        sizeGroups: { include: { marmitaSize: true } },
        items: { orderBy: [{ order: 'asc' }, { name: 'asc' }] },
      },
      orderBy: [{ order: 'asc' }, { name: 'asc' }],
    });
  }

  createItemGroup(data: { name: string; order?: number }) {
    return this.prisma.marmitaItemGroup.create({ data });
  }
  updateItemGroup(id: number, data: any) {
    return this.prisma.marmitaItemGroup.update({ where: { id }, data });
  }
  async removeItemGroup(id: number) {
    await this.prisma.marmitaItemGroup.delete({ where: { id } });
    return { message: 'Grupo removido' };
  }

  // ── Size↔Group links (per-size config) ───────────────────
  async upsertSizeGroup(data: {
    marmitaSizeId: number;
    itemGroupId: number;
    maxChoices: number;
    required: boolean;
    order: number;
  }) {
    return this.prisma.marmitaSizeGroup.upsert({
      where: {
        marmitaSizeId_itemGroupId: {
          marmitaSizeId: data.marmitaSizeId,
          itemGroupId: data.itemGroupId,
        },
      },
      update: {
        maxChoices: data.maxChoices,
        required: data.required,
        order: data.order,
      },
      create: data,
    });
  }

  async removeSizeGroup(marmitaSizeId: number, itemGroupId: number) {
    await this.prisma.marmitaSizeGroup.delete({
      where: {
        marmitaSizeId_itemGroupId: { marmitaSizeId, itemGroupId },
      },
    });
    return { message: 'Vínculo removido' };
  }

  // ── Items (global) ───────────────────────────────────────
  getAllItems() {
    return this.prisma.marmitaItem.findMany({
      include: { itemGroup: true },
      orderBy: [{ itemGroupId: 'asc' }, { order: 'asc' }, { name: 'asc' }],
    });
  }

  createItem(data: {
    name: string;
    imageUrl?: string;
    extraPrice?: number;
    active?: boolean;
    order?: number;
    itemGroupId: number;
    allowedSizes?: number[];
  }) {
    const { allowedSizes, ...rest } = data;
    return this.prisma.marmitaItem.create({
      data: {
        ...rest,
        allowedSizesJson: JSON.stringify(allowedSizes ?? []),
      },
      include: { itemGroup: true },
    });
  }

  updateItem(id: number, data: any) {
    const { allowedSizes, ...rest } = data;
    return this.prisma.marmitaItem.update({
      where: { id },
      data: {
        ...rest,
        ...(allowedSizes !== undefined
          ? { allowedSizesJson: JSON.stringify(allowedSizes) }
          : {}),
      },
      include: { itemGroup: true },
    });
  }

  async removeItem(id: number) {
    await this.prisma.marmitaItem.delete({ where: { id } });
    return { message: 'Item removido' };
  }
}
