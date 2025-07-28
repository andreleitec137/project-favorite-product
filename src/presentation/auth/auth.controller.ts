import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthInputDTO } from 'src/application/auth/dto/auth.input.dto';
import { AuthOutputDTO } from 'src/application/auth/dto/auth.output.dto';
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
  @ApiOperation({
    summary: 'Login de usuário',
    description:
      'Autentica um usuário e retorna um token JWT. (Responsável pelo CRUD de Cliente)',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário autenticado com sucesso',
    schema: {
      type: 'object',
      properties: {
        access_token: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6...',
        },
      },
    },
  })
  async userLogin(
    @Body() { email, password }: AuthInputDTO,
  ): Promise<AuthOutputDTO> {
    return this.authUserUseCase.execute({ email, password });
  }

  @Post('customer/login')
  @ApiOperation({
    summary: 'Login de cliente',
    description:
      'Autentica um cliente e retorna um token JWT. (Responsável por favoritar e listar produtos)',
  })
  @ApiResponse({
    status: 200,
    description: 'Cliente autenticado com sucesso',
    schema: {
      type: 'object',
      properties: {
        access_token: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6...',
        },
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  async customerLogin(
    @Body() { email, password }: AuthInputDTO,
  ): Promise<AuthOutputDTO> {
    return this.authCustomerUseCase.execute({ email, password });
  }
}
