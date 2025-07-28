import { ApiProperty } from '@nestjs/swagger';

export class FavoriteProductDTO {
  @ApiProperty({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
  id: number;

  @ApiProperty({ example: 'Product 1' })
  title: string;

  @ApiProperty({ example: 124 })
  price: number;

  @ApiProperty({ example: 'Product description' })
  description: string;

  @ApiProperty({ example: 'Product Category' })
  category: string;

  @ApiProperty({ example: 'image.com.br' })
  image: string;

  @ApiProperty({
    example: {
      rate: 124,
      count: 1234,
    },
  })
  rating: { rate: number; count: number };
}
