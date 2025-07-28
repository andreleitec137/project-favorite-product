import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';

export class UpdateCustomerInputDTO {
  @ApiProperty({ example: 'João Silva' })
  @IsOptional()
  readonly name?: string;

  @ApiProperty({ example: 'example@example.com' })
  @IsOptional()
  @IsEmail()
  readonly email?: string;
}
