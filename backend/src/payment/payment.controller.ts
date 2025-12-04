import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @UseGuards(JwtAuthGuard)
  @Post('confirm')
  async confirmPayment(
    @Body() body: { paymentKey: string; orderId: string; amount: number },
  ) {
    return this.paymentService.confirmPayment(
      body.paymentKey,
      body.orderId,
      body.amount,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('cancel')
  async cancelPayment(
    @Body() body: { paymentKey: string; cancelReason: string },
  ) {
    return this.paymentService.cancelPayment(body.paymentKey, body.cancelReason);
  }
}

