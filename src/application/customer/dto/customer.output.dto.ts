import { ApiProperty } from '@nestjs/swagger';

export class CustomerOutputDTO {
  @ApiProperty({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
  id: string;

  @ApiProperty({ example: 'Joao Silva' })
  name: string;

  @ApiProperty({ example: 'example@example.com' })
  email: string;

  @ApiProperty({ example: new Date() })
  createdAt: Date;

  @ApiProperty({ example: new Date() })
  updatedAt?: Date | undefined;

  password?: string;
}
