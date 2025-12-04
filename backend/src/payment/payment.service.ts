import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class PaymentService {
  private readonly tossSecretKey: string;

  constructor(private configService: ConfigService) {
    this.tossSecretKey = this.configService.get('TOSS_PAYMENTS_SECRET_KEY');
  }

  async confirmPayment(paymentKey: string, orderId: string, amount: number): Promise<any> {
    try {
      const response = await axios.post(
        'https://api.tosspayments.com/v1/payments/confirm',
        {
          paymentKey,
          orderId,
          amount,
        },
        {
          headers: {
            Authorization: `Basic ${Buffer.from(this.tossSecretKey + ':').toString('base64')}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data;
    } catch (error) {
      throw new Error(`결제 승인 실패: ${error.response?.data?.message || error.message}`);
    }
  }

  async cancelPayment(paymentKey: string, cancelReason: string): Promise<any> {
    try {
      const response = await axios.post(
        `https://api.tosspayments.com/v1/payments/${paymentKey}/cancel`,
        {
          cancelReason,
        },
        {
          headers: {
            Authorization: `Basic ${Buffer.from(this.tossSecretKey + ':').toString('base64')}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data;
    } catch (error) {
      throw new Error(`결제 취소 실패: ${error.response?.data?.message || error.message}`);
    }
  }
}

