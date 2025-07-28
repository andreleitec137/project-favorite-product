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
    private readonly ormRepository: Repository<CustomerOrmEntity>,
    @InjectRepository(FavoriteProductsOrmEntity)
    private readonly favoriteRepository: Repository<FavoriteProductsOrmEntity>,
  ) {}

  async create(data: CreateCustomerInputDTO): Promise<CustomerEntity> {
    const orm = this.ormRepository.create({ ...data });
    const saved = await this.ormRepository.save(orm);
    return CustomerMapper.toDomain(saved);
  }

  async update(
    id: string,
    data: UpdateCustomerInputDTO,
  ): Promise<CustomerEntity> {
    await this.ormRepository.update(id, data);
    const updated = await this.ormRepository.findOneBy({ id });
    if (!updated) throw new Error('Customer not found');
    return CustomerMapper.toDomain(updated);
  }

  async findOne(id: string): Promise<CustomerEntity | null> {
    const orm = await this.ormRepository.findOneBy({ id });
    return orm ? CustomerMapper.toDomain(orm) : null;
  }

  async findByEmail(email: string): Promise<CustomerEntity | null> {
    const orm = await this.ormRepository.findOneBy({ email });
    return orm ? CustomerMapper.toDomain(orm) : null;
  }

  async findMany(): Promise<CustomerEntity[]> {
    const customers = await this.ormRepository.find();
    return customers.map((customer) => CustomerMapper.toDomain(customer));
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async addFavorite(customerId: string, productId: number): Promise<void> {
    const favorite = this.favoriteRepository.create({ customerId, productId });
    await this.favoriteRepository.save(favorite);
  }

  async getFavoriteByCustomerAndProductId(
    customerId: string,
    productId: number,
  ): Promise<FavoriteProductsOrmEntity | null> {
    const favorite = await this.favoriteRepository.findOne({
      where: {
        customerId,
        productId,
      },
    });

    return favorite;
  }

  async removeFavorite(id: string): Promise<void> {
    await this.favoriteRepository.delete({ id });
  }

  async listFavorites(customerId: string): Promise<number[]> {
    const favs = await this.favoriteRepository.find({
      where: { customerId },
      select: ['productId'],
    });
    return favs.map((f) => f.productId);
  }
}
