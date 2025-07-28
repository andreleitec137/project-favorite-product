import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateCustomerInputDTO {
  @ApiProperty({ example: 'João Silva' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 'example@example.com' })
  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  readonly password?: string;
}
