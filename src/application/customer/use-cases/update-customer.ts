import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CustomerRepository } from 'src/domain/customer/repository/customer.repository';
import { CustomerOutputDTO } from '../dto/customer.output.dto';
import { UpdateCustomerInputDTO } from '../dto/update-customer.input.dto';

@Injectable()
class UpdateCustomerUseCase {
  constructor(
    @Inject('CustomerRepository')
    private readonly customerRepository: CustomerRepository,
  ) {}

  async execute(
    id: string,
    data: UpdateCustomerInputDTO,
  ): Promise<CustomerOutputDTO> {
    const customer = await this.customerRepository.findOne(id);

    if (!customer) {
      throw new BadRequestException('Customer not found');
    }

    const payload: Partial<{
      name: string;
      email: string;
      updatedAt: Date;
    }> = {};

    if (data.email && data.email !== customer.email) {
      const customerWithSameEmail = await this.customerRepository.findByEmail(
        data.email,
      );

      if (customerWithSameEmail) {
        throw new BadRequestException(
          'Customer with this email already exists',
        );
      }

      payload.email = data.email;
    }

    if (data.name !== undefined) payload.name = data.name;
    payload.updatedAt = new Date();

    const customerUpdated = await this.customerRepository.update(
      customer.id,
      payload,
    );

    return {
      id: customerUpdated.id,
      name: customerUpdated.name,
      email: customerUpdated.email,
      createdAt: customerUpdated.createdAt,
      updatedAt: customerUpdated.updatedAt,
    };
  }
}

export default UpdateCustomerUseCase;
