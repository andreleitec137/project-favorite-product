import { Inject, Injectable } from '@nestjs/common';
import { CustomerRepository } from 'src/domain/customer/repository/customer.repository';
import { ProductService } from 'src/infrastructure/http/product.service';
import { FavoriteProductDTO } from '../dto/favorite-product.dto';

@Injectable()
class ListProductsUseCase {
  constructor(
    @Inject('CustomerRepository')
    private readonly customerRepository: CustomerRepository,
    private readonly productService: ProductService,
  ) {}

  async execute(customerId: string): Promise<FavoriteProductDTO[]> {
    const products = await this.productService.findAll();

    const favoriteProductsId =
      await this.customerRepository.listFavorites(customerId);

    return products.map((p) => ({
      ...p,
      isFavorite: favoriteProductsId.includes(p.id),
    }));
  }
}

export default ListProductsUseCase;
