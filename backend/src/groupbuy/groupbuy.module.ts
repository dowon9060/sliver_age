import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupbuyService } from './groupbuy.service';
import { GroupbuyController } from './groupbuy.controller';
import { Product } from './entities/product.entity';
import { GroupDeal } from './entities/group-deal.entity';
import { ProductReview } from './entities/product-review.entity';
import { Order } from './entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, GroupDeal, ProductReview, Order]),
  ],
  providers: [GroupbuyService],
  controllers: [GroupbuyController],
  exports: [GroupbuyService],
})
export class GroupbuyModule {}

