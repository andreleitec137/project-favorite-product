import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class CreateUserInputDTO {
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsStrongPassword()
  readonly password: string;
}
