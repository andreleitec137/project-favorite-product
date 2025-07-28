import { Inject, Injectable } from '@nestjs/common';
import { CustomerRepository } from 'src/domain/customer/repository/customer.repository';
import { CustomerOutputDTO } from '../dto/customer.output.dto';
import { FindManyCustomerInputDTO } from '../dto/find-many-customer.input.dto';

@Injectable()
class FindManyCustomerUseCase {
  constructor(
    @Inject('CustomerRepository')
    private readonly customerRepository: CustomerRepository,
  ) {}

  async execute(
    params?: FindManyCustomerInputDTO,
  ): Promise<CustomerOutputDTO[]> {
    const customers = await this.customerRepository.findMany(params);

    return customers.map((customer) => ({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    }));
  }
}

export default FindManyCustomerUseCase;
