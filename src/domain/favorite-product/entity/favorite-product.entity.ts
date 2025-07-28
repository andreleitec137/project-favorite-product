import BaseEntity from 'src/domain/base/entity/base.entity';

class FavoriteProduct extends BaseEntity {
  private _productId: string;
  private _customerId: string;

  constructor(
    id: string,
    productId: string,
    customerId: string,
    createdAt?: Date,
  ) {
    super(id, createdAt);
    this._productId = productId;
    this._customerId = customerId;
  }

  public get productId(): string {
    return this._productId;
  }

  public get customerId(): string {
    return this._customerId;
  }
}

export default FavoriteProduct;
