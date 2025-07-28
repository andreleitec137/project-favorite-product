import BaseEntity from 'src/domain/base/entity/base.entity';

class CustomerEntity extends BaseEntity {
  private _name: string;
  private _email: string;
  private _password: string;

  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    super(id, createdAt, updatedAt);
    this._name = name;
    this._email = email;
    this._password = password;
  }

  public get name(): string {
    return this._name;
  }

  public get email(): string {
    return this._email;
  }

  public get password(): string {
    return this._password;
  }
}

export default CustomerEntity;
