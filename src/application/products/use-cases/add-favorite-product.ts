import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { CustomerRepository } from 'src/domain/customer/repository/customer.repository';
import { ProductService } from 'src/infrastructure/http/product.service';

@Injectable()
export class AddFavoriteProductUseCase {
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

    const existingFavoriteProduct =
      await this.customerRepository.getFavoriteByCustomerAndProductId(
        customerId,
        productId,
      );

    if (existingFavoriteProduct)
      throw new BadRequestException('Product already favorited');

    await this.customerRepository.addFavorite(customerId, productId);
  }
}
