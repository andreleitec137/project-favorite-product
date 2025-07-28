import { BaseRepository } from 'src/domain/base/repository/base.repository';
import UserEntity from '../entity/user.entity';
import { UpdateUserDTO } from 'src/application/user/dto/update-user.dto';
import { CreateUserInputDTO } from 'src/application/user/dto/create-user.input.dto';

export interface UserRepository
  extends BaseRepository<CreateUserInputDTO, UpdateUserDTO, UserEntity> {
  findByEmail(email: string): Promise<UserEntity | null>;
}
