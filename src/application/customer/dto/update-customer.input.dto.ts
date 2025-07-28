import { IsEmail, IsOptional } from 'class-validator';

export class UpdateCustomerInputDTO {
  @IsOptional()
  readonly name?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;
}
