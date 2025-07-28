import { ApiProperty } from '@nestjs/swagger';
export class AuthOutputDTO {
  @ApiProperty({ description: 'Token JWT de acesso' })
  access_token: string;
}
