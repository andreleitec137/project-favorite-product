import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CustomerRepository } from 'src/domain/customer/repository/customer.repository';
import { CreateCustomerInputDTO } from '../dto/create-customer.input.dto';
import { CustomerOutputDTO } from '../dto/customer.output.dto';
import { generatePassword } from 'src/utils/generate-password';
import { HashService } from 'src/infrastructure/core/hash/hash.service';

@Injectable()
class CreateCustomerUseCase {
  constructor(
    @Inject('CustomerRepository')
    private readonly customerRepository: CustomerRepository,
    private readonly hashService: HashService,
  ) {}

  async execute(data: CreateCustomerInputDTO): Promise<CustomerOutputDTO> {
    const customerWithSameEmail = await this.customerRepository.findByEmail(
      data.email,
    );

    if (customerWithSameEmail) {
      throw new BadRequestException('Customer with this email already exists');
    }

    const passwordGenerated = generatePassword();
    const hashed = await this.hashService.hash(passwordGenerated);

    const customerCreated = await this.customerRepository.create({
      email: data.email,
      name: data.name,
      password: hashed,
    });

    return {
      id: customerCreated.id,
      name: customerCreated.name,
      email: customerCreated.email,
      password: passwordGenerated,
      createdAt: customerCreated.createdAt,
    };
  }
}

export default CreateCustomerUseCase;
