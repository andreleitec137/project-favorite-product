class BaseEntity {
  private _id: string;
  private _createdAt: Date;
  private _updatedAt?: Date;

  protected constructor(id: string, createdAt?: Date, updatedAt?: Date) {
    this._id = id;
    this._createdAt = createdAt ? new Date(createdAt) : new Date();
    this._updatedAt = updatedAt ? new Date(updatedAt) : undefined;
  }

  public get id(): string {
    return this._id;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get updatedAt(): Date | undefined {
    return this._updatedAt;
  }
}

export default BaseEntity;
