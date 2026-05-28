import { Controller, Post, Body } from '@nestjs/common';
import { SettingsService } from '../settings/settings.service';

@Controller('orders')
export class OrdersController {
  constructor(private settings: SettingsService) {}

  @Post('whatsapp')
  async buildWhatsApp(@Body() order: any) {
    const phone = process.env.WHATSAPP_NUMBER || '553838411604';
    const lines: string[] = ['*Pedido Bakaninha*\n'];

    if (order.name)  lines.push(`*Cliente:* ${order.name}`);
    if (order.phone) lines.push(`*Telefone:* ${order.phone}`);

    if (order.type === 'local') {
      lines.push(`*Mesa:* ${order.table}`);
    } else {
      lines.push(`*Entrega:* ${order.address}`);
    }
    lines.push('');

    lines.push('*Itens:*');
    for (const item of order.items || []) {
      const sub = item.variant ? ` (${item.variant})` : '';
      lines.push(`• ${item.name}${sub} x${item.qty} — R$ ${(item.price * item.qty).toFixed(2)}`);
      if (item.selections) {
        for (const [group, choices] of Object.entries(item.selections as Record<string, any>)) {
          const val = Array.isArray(choices) ? choices.join(', ') : choices;
          lines.push(`  - ${group}: ${val}`);
        }
      }
    }

    const subtotal = (order.items || []).reduce((s: number, i: any) => s + i.price * i.qty, 0);
    const deliveryFee = order.type === 'delivery' ? await this.settings.getDeliveryFee() : 0;
    const total = subtotal + deliveryFee;

    lines.push('');
    if (deliveryFee > 0) {
      lines.push(`*Subtotal:* R$ ${subtotal.toFixed(2)}`);
      lines.push(`*Taxa de entrega:* R$ ${deliveryFee.toFixed(2)}`);
    }
    lines.push(`*Total:* R$ ${total.toFixed(2)}`);
    lines.push(`*Pagamento:* ${order.payment}`);
    if (order.observation) lines.push(`*Obs:* ${order.observation}`);

    const text = encodeURIComponent(lines.join('\n'));
    return { url: `https://wa.me/${phone}?text=${text}` };
  }
}
