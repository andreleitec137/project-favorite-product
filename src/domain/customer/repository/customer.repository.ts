import { BaseRepository } from 'src/domain/base/repository/base.repository';
import CustomerEntity from '../entity/customer.entity';
import { CreateCustomerInputDTO } from 'src/application/customer/dto/create-customer.input.dto';
import { UpdateCustomerInputDTO } from 'src/application/customer/dto/update-customer.input.dto';
import { FavoriteProductsOrmEntity } from 'src/infrastructure/database/typeorm/favorite-product/entity/favorite-product.orm-entity';

export interface CustomerRepository
  extends BaseRepository<
    CreateCustomerInputDTO,
    UpdateCustomerInputDTO,
    CustomerEntity
  > {
  findByEmail(email: string): Promise<CustomerEntity | null>;
  addFavorite(customerId: string, productId: number): Promise<void>;
  removeFavorite(id: string): Promise<void>;
  listFavorites(customerId: string): Promise<number[]>;
  getFavoriteByCustomerAndProductId(
    customerId: string,
    productId: number,
  ): Promise<FavoriteProductsOrmEntity | null>;
}
