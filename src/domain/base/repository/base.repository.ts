export abstract class BaseRepository<CreateDTO, UpdateDTO, Entity> {
  abstract create(data: CreateDTO): Promise<Entity>;
  abstract update(id: string, data: UpdateDTO): Promise<Entity>;
  abstract findOne(id: string): Promise<Entity | null>;
  abstract findMany(params?: {
    filter?: Partial<Entity>;
    skip?: number;
    take?: number;
    orderBy?: Partial<Record<keyof Entity, 'asc' | 'desc'>>;
  }): Promise<Entity[]>;
  abstract delete(id: string): Promise<void>;
}
