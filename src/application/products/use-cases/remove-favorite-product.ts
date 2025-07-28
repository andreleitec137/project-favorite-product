import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { CustomerRepository } from 'src/domain/customer/repository/customer.repository';
import { ProductService } from 'src/infrastructure/http/product.service';

@Injectable()
export class RemoveFavoriteProductUseCase {
  constructor(
    @Inject('CustomerRepository')
    private readonly customerRepository: CustomerRepository,
    private readonly productService: ProductService,
  ) {}

  async execute(customerId: string, productId: number): Promise<void> {
    const productExists = await this.productService.findById(productId);

    if (!productExists) {
      throw new BadRequestException('Product not exists');
    }

    const existingProductFavorite =
      await this.customerRepository.getFavoriteByCustomerAndProductId(
        customerId,
        productId,
      );

    if (!existingProductFavorite)
      throw new BadRequestException('Product is not favorited');

    await this.customerRepository.removeFavorite(existingProductFavorite.id);
  }
}
