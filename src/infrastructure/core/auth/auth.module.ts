import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { AuthController } from 'src/presentation/auth/auth.controller';
import AuthenticationUserUseCase from 'src/application/user/use-cases/authentication';
import { env } from 'src/config/env';
import AuthenticationCustomerUseCase from 'src/application/customer/use-cases/authentication';
import { CustomerModule } from '../customer/customer.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
    CustomerModule,
  ],
  providers: [
    JwtStrategy,
    AuthenticationUserUseCase,
    AuthenticationCustomerUseCase,
  ],
  exports: [
    JwtModule,
    AuthenticationUserUseCase,
    AuthenticationCustomerUseCase,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
