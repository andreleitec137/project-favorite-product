import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/domain/user/repository/user.repository';
import { CreateUserInputDTO } from '../dto/create-user.input.dto';
import { CreateUserOutputDTO } from '../dto/create-user.output.dto';
import { HashService } from 'src/infrastructure/core/hash/hash.service';

@Injectable()
class CreateUserUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
  ) {}

  async execute(data: CreateUserInputDTO): Promise<CreateUserOutputDTO> {
    const userWithSameEmail = await this.userRepository.findByEmail(data.email);

    if (userWithSameEmail) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashed = await this.hashService.hash(data.password);

    const userCreated = await this.userRepository.create({
      email: data.email,
      name: data.name,
      password: hashed,
    });

    return {
      id: userCreated.id,
      name: userCreated.name,
      email: userCreated.email,
      createdAt: userCreated.createdAt,
    };
  }
}

export default CreateUserUseCase;
