import UserEntity from 'src/domain/user/entity/user.entity';
import { UserOrmEntity } from '../typeorm/user/entity/user.orm-entity';

export class UserMapper {
  static toDomain(orm: UserOrmEntity): UserEntity {
    return new UserEntity(
      orm.id,
      orm.name,
      orm.email,
      orm.password,
      orm.createdAt,
      orm.updatedAt,
    );
  }

  static toOrm(domain: UserEntity): UserOrmEntity {
    const orm = new UserOrmEntity();
    orm.id = domain.id;
    orm.name = domain.name;
    orm.email = domain.email;
    orm.password = domain.password;
    orm.createdAt = domain.createdAt;
    orm.updatedAt = domain.updatedAt;
    return orm;
  }
}
