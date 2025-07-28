import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomerRepository } from 'src/domain/customer/repository/customer.repository';
import { JwtPayload } from 'src/infrastructure/core/auth/jwt.types';
import { HashService } from 'src/infrastructure/core/hash/hash.service';

@Injectable()
class AuthenticationCustomerUseCase {
  constructor(
    @Inject('CustomerRepository')
    private readonly customerRepository: CustomerRepository,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const customer = await this.customerRepository.findByEmail(email);
    if (!customer) throw new BadRequestException('Invalid credentials');

    const isPasswordMatch = await this.hashService.compare(
      password,
      customer.password,
    );

    if (!isPasswordMatch) throw new BadRequestException('Invalid credentials');

    const payload: JwtPayload = {
      sub: customer.id,
      email: customer.email,
      name: customer.name,
      role: 'customer',
    };

    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}

export default AuthenticationCustomerUseCase;
