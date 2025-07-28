import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import AuthenticationCustomerUseCase from 'src/application/customer/use-cases/authentication';
import AuthenticationUserUseCase from 'src/application/user/use-cases/authentication';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authUserUseCase: AuthenticationUserUseCase,
    private readonly authCustomerUseCase: AuthenticationCustomerUseCase,
  ) {}

  @Post('user/login')
  @HttpCode(HttpStatus.OK)
  async userLogin(@Body() body: { email: string; password: string }) {
    return this.authUserUseCase.execute(body.email, body.password);
  }

  @Post('customer/login')
  @HttpCode(HttpStatus.OK)
  async customerLogin(@Body() body: { email: string; password: string }) {
    return this.authCustomerUseCase.execute(body.email, body.password);
  }
}
