import { Controller, Get, Post, Body, UseGuards, Request, Param } from '@nestjs/common';
import { GroupbuyService } from './groupbuy.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('groupbuy')
export class GroupbuyController {
  constructor(private groupbuyService: GroupbuyService) {}

  @Get('products')
  async findAllProducts() {
    return this.groupbuyService.findAllProducts();
  }

  @Get('deals')
  async findActiveDeals() {
    return this.groupbuyService.findActiveDeals();
  }

  @UseGuards(JwtAuthGuard)
  @Post('orders')
  async createOrder(@Request() req, @Body() orderData: any) {
    return this.groupbuyService.createOrder(req.user.userId, orderData);
  }

  @UseGuards(JwtAuthGuard)
  @Post('products/:id/reviews')
  async createReview(
    @Request() req,
    @Param('id') id: string,
    @Body() body: { rating: number; content: string },
  ) {
    return this.groupbuyService.createReview(req.user.userId, +id, body.rating, body.content);
  }
}

