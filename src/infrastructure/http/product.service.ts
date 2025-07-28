import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { FavoriteProductDTO } from 'src/application/products/dto/favorite-product.dto';
import { env } from 'src/config/env';

@Injectable()
export class ProductService {
  private readonly base = env.PRODUCT_URL;

  constructor(private readonly http: HttpService) {}

  async findAll(): Promise<FavoriteProductDTO[]> {
    const obs = this.http.get<FavoriteProductDTO[]>(this.base);
    const { data } = await firstValueFrom(obs);
    return data;
  }

  async findById(id: number): Promise<FavoriteProductDTO> {
    const obs = this.http.get<FavoriteProductDTO>(`${this.base}/${id}`);
    const { data } = await firstValueFrom(obs);
    return data;
  }
}
