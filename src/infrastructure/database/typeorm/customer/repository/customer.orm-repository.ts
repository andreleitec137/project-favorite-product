import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerRepository } from 'src/domain/customer/repository/customer.repository';
import { CustomerOrmEntity } from '../entity/customer.orm-entity';
import { Repository } from 'typeorm';
import { CustomerMapper } from 'src/infrastructure/database/mappers/customer.mapper';
import { CreateCustomerInputDTO } from 'src/application/customer/dto/create-customer.input.dto';
import CustomerEntity from 'src/domain/customer/entity/customer.entity';
import { UpdateCustomerInputDTO } from 'src/application/customer/dto/update-customer.input.dto';
import { FavoriteProductsOrmEntity } from '../../favorite-product/entity/favorite-product.orm-entity';

@Injectable()
export class CustomerOrmRepository implements CustomerRepository {
  constructor(
    @InjectRepository(CustomerOrmEntity)
    private readonly ormRepo: Repository<CustomerOrmEntity>,
    @InjectRepository(FavoriteProductsOrmEntity)
    private readonly favRepo: Repository<FavoriteProductsOrmEntity>,
  ) {}

  async create(data: CreateCustomerInputDTO): Promise<CustomerEntity> {
    const orm = this.ormRepo.create({ ...data });
    const saved = await this.ormRepo.save(orm);
    return CustomerMapper.toDomain(saved);
  }

  async update(
    id: string,
    data: UpdateCustomerInputDTO,
  ): Promise<CustomerEntity> {
    await this.ormRepo.update(id, data);
    const updated = await this.ormRepo.findOneBy({ id });
    if (!updated) throw new Error('Customer not found');
    return CustomerMapper.toDomain(updated);
  }

  async findOne(id: string): Promise<CustomerEntity | null> {
    const orm = await this.ormRepo.findOneBy({ id });
    return orm ? CustomerMapper.toDomain(orm) : null;
  }

  async findByEmail(email: string): Promise<CustomerEntity | null> {
    const orm = await this.ormRepo.findOneBy({ email });
    return orm ? CustomerMapper.toDomain(orm) : null;
  }

  async findMany(): Promise<CustomerEntity[]> {
    const customers = await this.ormRepo.find();
    return customers.map((customer) => CustomerMapper.toDomain(customer));
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }

  async addFavorite(customerId: string, productId: number): Promise<void> {
    const fav = this.favRepo.create({ customerId, productId });
    await this.favRepo.save(fav);
  }

  async getFavoriteByCustomerAndProductId(
    customerId: string,
    productId: number,
  ): Promise<FavoriteProductsOrmEntity | null> {
    const fav = await this.favRepo.findOne({
      where: {
        customerId,
        productId,
      },
    });

    return fav;
  }

  async removeFavorite(id: string): Promise<void> {
    await this.favRepo.delete({ id });
  }

  async listFavorites(customerId: string): Promise<number[]> {
    const favs = await this.favRepo.find({
      where: { customerId },
      select: ['productId'],
    });
    return favs.map((f) => f.productId);
  }
}
