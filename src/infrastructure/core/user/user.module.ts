import { Module } from '@nestjs/common';
import { HashService } from '../hash/hash.service';
import CreateUserUseCase from 'src/application/user/use-cases/create-user';
import { UserOrmRepository } from 'src/infrastructure/database/typeorm/user/repository/user.orm-repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from 'src/infrastructure/database/typeorm/user/entity/user.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
  providers: [
    HashService,
    CreateUserUseCase,
    {
      provide: 'UserRepository',
      useClass: UserOrmRepository,
    },
  ],
  exports: ['UserRepository', HashService, CreateUserUseCase],
  controllers: [],
})
export class UserModule {}
