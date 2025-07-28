import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { FavoriteProductDTO } from 'src/application/products/dto/favorite-product.dto';

@Injectable()
export class ProductService {
  private readonly base = 'https://fakestoreapi.com/products';

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
