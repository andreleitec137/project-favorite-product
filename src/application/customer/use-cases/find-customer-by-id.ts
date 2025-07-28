import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CustomerRepository } from 'src/domain/customer/repository/customer.repository';
import { CustomerOutputDTO } from '../dto/customer.output.dto';

@Injectable()
class FindCustomerByIdUseCase {
  constructor(
    @Inject('CustomerRepository')
    private readonly customerRepository: CustomerRepository,
  ) {}

  async execute(id: string): Promise<CustomerOutputDTO> {
    const customer = await this.customerRepository.findOne(id);

    if (!customer) {
      throw new BadRequestException('Customer not found');
    }

    return {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    };
  }
}

export default FindCustomerByIdUseCase;
