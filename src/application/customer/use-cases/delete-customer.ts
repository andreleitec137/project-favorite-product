import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CustomerRepository } from 'src/domain/customer/repository/customer.repository';

@Injectable()
class DeleteCustomerUseCase {
  constructor(
    @Inject('CustomerRepository')
    private readonly customerRepository: CustomerRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const customer = await this.customerRepository.findOne(id);

    if (!customer) {
      throw new BadRequestException('Customer not found');
    }

    await this.customerRepository.delete(customer.id);
  }
}

export default DeleteCustomerUseCase;
