import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/domain/user/repository/user.repository';
import { JwtPayload } from 'src/infrastructure/core/auth/jwt.types';
import { HashService } from 'src/infrastructure/core/hash/hash.service';

@Injectable()
class AuthenticationUserUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new BadRequestException('Invalid credentials');

    const isPasswordMatch = await this.hashService.compare(
      password,
      user.password,
    );

    if (!isPasswordMatch) throw new BadRequestException('Invalid credentials');

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: 'admin',
    };

    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}

export default AuthenticationUserUseCase;
