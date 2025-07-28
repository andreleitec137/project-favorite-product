import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
export class AuthInputDTO {
  @ApiProperty({ example: 'cliente@exemplo.com' })
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @ApiProperty({ example: 'SenhaSecreta123' })
  @IsString({ message: 'Password deve ser texto' })
  @MinLength(6, { message: 'Password muito curta' })
  password: string;
}
