import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { GroupDeal } from './entities/group-deal.entity';
import { ProductReview } from './entities/product-review.entity';
import { Order } from './entities/order.entity';

@Injectable()
export class GroupbuyService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(GroupDeal)
    private dealsRepository: Repository<GroupDeal>,
    @InjectRepository(ProductReview)
    private reviewsRepository: Repository<ProductReview>,
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async findAllProducts(): Promise<Product[]> {
    return this.productsRepository.find({ where: { isActive: true } });
  }

  async findActiveDeals(): Promise<GroupDeal[]> {
    return this.dealsRepository.find({
      where: { status: 'active' },
      relations: ['product'],
    });
  }

  async createOrder(userId: number, orderData: any): Promise<Order> {
    const order = this.ordersRepository.create({
      ...orderData,
      userId,
      orderNumber: `ORD-${Date.now()}-${userId}`,
    });
    return this.ordersRepository.save(order);
  }

  async createReview(userId: number, productId: number, rating: number, content: string): Promise<ProductReview> {
    const review = await this.reviewsRepository.save({
      userId,
      productId,
      rating,
      content,
    });

    // 상품 평균 평점 업데이트
    await this.updateProductRating(productId);

    return review;
  }

  private async updateProductRating(productId: number): Promise<void> {
    const reviews = await this.reviewsRepository.find({ where: { productId } });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    
    await this.productsRepository.update(
      { id: productId },
      { averageRating: avgRating, reviewsCount: reviews.length },
    );
  }
}

