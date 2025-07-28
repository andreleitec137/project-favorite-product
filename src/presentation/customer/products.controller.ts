import {
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request } from 'express';
import { FavoriteProductDTO } from 'src/application/products/dto/favorite-product.dto';
import { AddFavoriteProductUseCase } from 'src/application/products/use-cases/add-favorite-product';
import ListFavoriteProductsUseCase from 'src/application/products/use-cases/list-favorite-products';
import ListProductsUseCase from 'src/application/products/use-cases/list-products';
import { RemoveFavoriteProductUseCase } from 'src/application/products/use-cases/remove-favorite-product';
import { JwtAuthGuard } from 'src/infrastructure/core/auth/jwt.auth-guard';
import { JwtPayloadTransformed } from 'src/infrastructure/core/auth/jwt.types';
import { Roles } from 'src/infrastructure/core/auth/role.decorator';
import { RolesGuard } from 'src/infrastructure/core/auth/role.guard';

@ApiUnauthorizedResponse({
  description: 'JWT ausente ou inválido',
})
@ApiForbiddenResponse({
  description: 'Sem permissão para acessar este recurso',
})
@ApiBearerAuth('CustomerAuth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('customer')
@Controller('customers/products')
export class CustomerProductController {
  constructor(
    private readonly listProducts: ListProductsUseCase,
    private readonly listFavoriteProducts: ListFavoriteProductsUseCase,
    private readonly addFavoriteProduct: AddFavoriteProductUseCase,
    private readonly removeFavoriteProduct: RemoveFavoriteProductUseCase,
  ) {}

  @Get('all')
  @ApiResponse({
    status: 200,
    description: 'Produtos encontrados com sucesso',
    type: FavoriteProductDTO,
  })
  async findMany(@Req() req: Request & { user: JwtPayloadTransformed }) {
    const customerId = req.user.userId;
    return await this.listProducts.execute(customerId);
  }

  @Get('favorites')
  @ApiResponse({
    status: 200,
    description: 'Produtos favoritos encontrados com sucesso',
    type: FavoriteProductDTO,
  })
  async findManyFavorite(
    @Req() req: Request & { user: JwtPayloadTransformed },
  ) {
    const customerId = req.user.userId;
    return await this.listFavoriteProducts.execute(customerId);
  }

  @Patch(':productId/favorite')
  @ApiResponse({
    status: 204,
    description: 'Produto favoritado com sucesso',
  })
  @HttpCode(204)
  async addFavorite(
    @Param('productId') productId: number,
    @Req() req: Request & { user: JwtPayloadTransformed },
  ) {
    const customerId = req.user.userId;
    return await this.addFavoriteProduct.execute(customerId, productId);
  }

  @Patch(':productId/unfavorite')
  @ApiResponse({
    status: 204,
    description: 'Produto desfavoritado com sucesso',
  })
  @HttpCode(204)
  async removeFavorite(
    @Param('productId') productId: number,
    @Req() req: Request & { user: JwtPayloadTransformed },
  ) {
    const customerId = req.user.userId;
    return await this.removeFavoriteProduct.execute(customerId, productId);
  }
}
