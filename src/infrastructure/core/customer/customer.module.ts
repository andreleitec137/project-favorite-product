import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CreateCustomerUseCase from 'src/application/customer/use-cases/create-customer';
import DeleteCustomerUseCase from 'src/application/customer/use-cases/delete-customer';
import FindCustomerByIdUseCase from 'src/application/customer/use-cases/find-customer-by-id';
import FindManyCustomerUseCase from 'src/application/customer/use-cases/find-many-customer';
import UpdateCustomerUseCase from 'src/application/customer/use-cases/update-customer';
import { CustomerOrmEntity } from 'src/infrastructure/database/typeorm/customer/entity/customer.orm-entity';
import { CustomerOrmRepository } from 'src/infrastructure/database/typeorm/customer/repository/customer.orm-repository';
import { CustomerController } from 'src/presentation/customer/customer.controller';
import { HashService } from '../hash/hash.service';
import { CustomerProductController } from 'src/presentation/customer/products.controller';
import { ProductService } from 'src/infrastructure/http/product.service';
import ListProductsUseCase from 'src/application/products/use-cases/list-products';
import { FavoriteProductsOrmEntity } from 'src/infrastructure/database/typeorm/favorite-product/entity/favorite-product.orm-entity';
import { HttpModule } from '@nestjs/axios';
import ListFavoriteProductsUseCase from 'src/application/products/use-cases/list-favorite-products';
import { AddFavoriteProductUseCase } from 'src/application/products/use-cases/add-favorite-product';
import { RemoveFavoriteProductUseCase } from 'src/application/products/use-cases/remove-favorite-product';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerOrmEntity, FavoriteProductsOrmEntity]),
    HttpModule,
  ],
  providers: [
    {
      provide: 'CustomerRepository',
      useClass: CustomerOrmRepository,
    },
    HashService,
    CreateCustomerUseCase,
    UpdateCustomerUseCase,
    FindCustomerByIdUseCase,
    FindManyCustomerUseCase,
    DeleteCustomerUseCase,

    // Products
    ProductService,
    ListProductsUseCase,
    ListFavoriteProductsUseCase,
    AddFavoriteProductUseCase,
    RemoveFavoriteProductUseCase,
  ],
  controllers: [CustomerController, CustomerProductController],
  exports: ['CustomerRepository', HashService],
})
export class CustomerModule {}
