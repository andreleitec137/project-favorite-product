import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiParam,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateCustomerInputDTO } from 'src/application/customer/dto/create-customer.input.dto';
import { CustomerOutputDTO } from 'src/application/customer/dto/customer.output.dto';
import { UpdateCustomerInputDTO } from 'src/application/customer/dto/update-customer.input.dto';
import CreateCustomerUseCase from 'src/application/customer/use-cases/create-customer';
import DeleteCustomerUseCase from 'src/application/customer/use-cases/delete-customer';
import FindCustomerByIdUseCase from 'src/application/customer/use-cases/find-customer-by-id';
import FindManyCustomerUseCase from 'src/application/customer/use-cases/find-many-customer';
import UpdateCustomerUseCase from 'src/application/customer/use-cases/update-customer';
import { JwtAuthGuard } from 'src/infrastructure/core/auth/jwt.auth-guard';
import { Roles } from 'src/infrastructure/core/auth/role.decorator';
import { RolesGuard } from 'src/infrastructure/core/auth/role.guard';

@ApiUnauthorizedResponse({
  description: 'JWT ausente ou inválido',
})
@ApiForbiddenResponse({
  description: 'Sem permissão para acessar este recurso',
})
@ApiBearerAuth('UserAuth')
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
  @ApiResponse({
    status: 201,
    description: 'Clientes criado com sucesso',
    type: CustomerOutputDTO,
  })
  async create(@Body() input: CreateCustomerInputDTO) {
    return await this.createCustomer.execute(input);
  }

  @Patch(':customerId')
  @ApiParam({
    name: 'customerId',
    description: 'UUID do cliente',
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  @ApiResponse({
    status: 200,
    description: 'Clientes atualizado com sucesso',
    type: CustomerOutputDTO,
  })
  async update(
    @Param('customerId', new ParseUUIDPipe({ version: '4' }))
    customerId: string,
    @Body() input: UpdateCustomerInputDTO,
  ) {
    return await this.updateCustomer.execute(customerId, input);
  }

  @Delete(':customerId')
  @ApiParam({
    name: 'customerId',
    description: 'UUID do cliente',
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  @ApiResponse({
    status: 204,
    description: 'Clientes deletado com sucesso',
  })
  @HttpCode(204)
  async delete(
    @Param('customerId', new ParseUUIDPipe({ version: '4' }))
    customerId: string,
  ): Promise<void> {
    await this.deleteCustomer.execute(customerId);
  }

  @Get('all')
  @ApiResponse({
    status: 200,
    description: 'Clientes encontrado com sucesso',
    type: [CustomerOutputDTO],
  })
  async findMany() {
    return await this.findManyCustomer.execute();
  }

  @Get(':customerId')
  @ApiParam({
    name: 'customerId',
    description: 'UUID do cliente',
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  @ApiResponse({
    status: 200,
    description: 'Cliente encontrado com sucesso',
    type: CustomerOutputDTO,
  })
  async findOne(
    @Param('customerId', new ParseUUIDPipe({ version: '4' }))
    customerId: string,
  ) {
    return await this.findCustomerById.execute(customerId);
  }
}
