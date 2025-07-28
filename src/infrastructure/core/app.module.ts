import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { env } from 'src/config/env';
import { CustomerModule } from './customer/customer.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: false,
      logging: true,
    }),
    CustomerModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
