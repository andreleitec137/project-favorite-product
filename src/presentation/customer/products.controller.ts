import { Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AddFavoriteProductUseCase } from 'src/application/products/use-cases/add-favorite-product';
import ListFavoriteProductsUseCase from 'src/application/products/use-cases/list-favorite-products';
import ListProductsUseCase from 'src/application/products/use-cases/list-products';
import { RemoveFavoriteProductUseCase } from 'src/application/products/use-cases/remove-favorite-product';
import { JwtAuthGuard } from 'src/infrastructure/core/auth/jwt.auth-guard';
import { JwtPayloadTransformed } from 'src/infrastructure/core/auth/jwt.types';
import { Roles } from 'src/infrastructure/core/auth/role.decorator';
import { RolesGuard } from 'src/infrastructure/core/auth/role.guard';

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
  async findMany(@Req() req: Request & { user: JwtPayloadTransformed }) {
    const customerId = req.user.userId;
    return await this.listProducts.execute(customerId);
  }

  @Get('favorites')
  async findManyFavorite(
    @Req() req: Request & { user: JwtPayloadTransformed },
  ) {
    const customerId = req.user.userId;
    return await this.listFavoriteProducts.execute(customerId);
  }

  @Patch(':productId/favorite')
  async addFavorite(
    @Param('productId') productId: number,
    @Req() req: Request & { user: JwtPayloadTransformed },
  ) {
    const customerId = req.user.userId;
    return await this.addFavoriteProduct.execute(customerId, productId);
  }

  @Patch(':productId/unfavorite')
  async removeFavorite(
    @Param('productId') productId: number,
    @Req() req: Request & { user: JwtPayloadTransformed },
  ) {
    const customerId = req.user.userId;
    return await this.removeFavoriteProduct.execute(customerId, productId);
  }
}
