import { IsEmail, IsOptional, IsStrongPassword } from 'class-validator';

export class UpdateUserDTO {
  @IsOptional()
  readonly name?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  @IsStrongPassword()
  readonly password?: string;
}
