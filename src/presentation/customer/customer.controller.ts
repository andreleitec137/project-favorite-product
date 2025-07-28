import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateCustomerInputDTO } from 'src/application/customer/dto/create-customer.input.dto';
import { FindManyCustomerInputDTO } from 'src/application/customer/dto/find-many-customer.input.dto';
import { UpdateCustomerInputDTO } from 'src/application/customer/dto/update-customer.input.dto';
import CreateCustomerUseCase from 'src/application/customer/use-cases/create-customer';
import DeleteCustomerUseCase from 'src/application/customer/use-cases/delete-customer';
import FindCustomerByIdUseCase from 'src/application/customer/use-cases/find-customer-by-id';
import FindManyCustomerUseCase from 'src/application/customer/use-cases/find-many-customer';
import UpdateCustomerUseCase from 'src/application/customer/use-cases/update-customer';
import { JwtAuthGuard } from 'src/infrastructure/core/auth/jwt.auth-guard';
import { Roles } from 'src/infrastructure/core/auth/role.decorator';
import { RolesGuard } from 'src/infrastructure/core/auth/role.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Controller('customers')
export class CustomerController {
  constructor(
    private readonly createCustomer: CreateCustomerUseCase,
    private readonly updateCustomer: UpdateCustomerUseCase,
    private readonly deleteCustomer: DeleteCustomerUseCase,
    private readonly findCustomerById: FindCustomerByIdUseCase,
    private readonly findManyCustomer: FindManyCustomerUseCase,
  ) {}

  @Post()
  async create(@Body() input: CreateCustomerInputDTO) {
    return await this.createCustomer.execute(input);
  }

  @Patch(':customerId')
  async update(
    @Param('customerId', new ParseUUIDPipe({ version: '4' }))
    customerId: string,
    @Body() input: UpdateCustomerInputDTO,
  ) {
    return await this.updateCustomer.execute(customerId, input);
  }

  @Delete(':customerId')
  async delete(
    @Param('customerId', new ParseUUIDPipe({ version: '4' }))
    customerId: string,
  ) {
    return await this.deleteCustomer.execute(customerId);
  }

  @Get('all')
  async findMany(@Query() query: FindManyCustomerInputDTO) {
    return await this.findManyCustomer.execute(query);
  }

  @Get(':customerId')
  async findOne(
    @Param('customerId', new ParseUUIDPipe({ version: '4' }))
    customerId: string,
  ) {
    return await this.findCustomerById.execute(customerId);
  }
}
