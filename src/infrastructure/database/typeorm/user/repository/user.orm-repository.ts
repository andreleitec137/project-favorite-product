import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserOrmEntity } from '../entity/user.orm-entity';
import { UserRepository } from 'src/domain/user/repository/user.repository';
import { CreateUserInputDTO } from 'src/application/user/dto/create-user.input.dto';
import UserEntity from 'src/domain/user/entity/user.entity';
import { UpdateUserDTO } from 'src/application/user/dto/update-user.dto';
import { UserMapper } from 'src/infrastructure/database/mappers/user.mapper';

@Injectable()
export class UserOrmRepository implements UserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly ormRepo: Repository<UserOrmEntity>,
  ) {}

  async create(data: CreateUserInputDTO): Promise<UserEntity> {
    const orm = this.ormRepo.create({ ...data });
    const saved = await this.ormRepo.save(orm);
    return UserMapper.toDomain(saved);
  }

  async update(id: string, data: UpdateUserDTO): Promise<UserEntity> {
    await this.ormRepo.update(id, data);
    const updated = await this.ormRepo.findOneBy({ id });
    if (!updated) throw new Error('User not found');
    return UserMapper.toDomain(updated);
  }

  async findOne(id: string): Promise<UserEntity | null> {
    const orm = await this.ormRepo.findOneBy({ id });
    return orm ? UserMapper.toDomain(orm) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const orm = await this.ormRepo.findOneBy({ email });
    return orm ? UserMapper.toDomain(orm) : null;
  }

  async findMany(): Promise<UserEntity[]> {
    const customers = await this.ormRepo.find();
    return customers.map((customer) => UserMapper.toDomain(customer));
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }
}
