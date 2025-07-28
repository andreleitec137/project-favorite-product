import CustomerEntity from 'src/domain/customer/entity/customer.entity';
import { CustomerOrmEntity } from '../typeorm/customer/entity/customer.orm-entity';

export class CustomerMapper {
  static toDomain(orm: CustomerOrmEntity): CustomerEntity {
    return new CustomerEntity(
      orm.id,
      orm.name,
      orm.email,
      orm.password,
      orm.createdAt,
      orm.updatedAt,
    );
  }

  static toOrm(domain: CustomerEntity): CustomerOrmEntity {
    const orm = new CustomerOrmEntity();
    orm.id = domain.id;
    orm.name = domain.name;
    orm.email = domain.email;
    orm.password = domain.password;
    orm.createdAt = domain.createdAt;
    orm.updatedAt = domain.updatedAt;
    return orm;
  }
}
