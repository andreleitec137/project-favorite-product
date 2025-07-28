export abstract class BaseRepository<CreateDTO, UpdateDTO, Entity> {
  abstract create(data: CreateDTO): Promise<Entity>;
  abstract update(id: string, data: UpdateDTO): Promise<Entity>;
  abstract findOne(id: string): Promise<Entity | null>;
  abstract findMany(): Promise<Entity[]>;
  abstract delete(id: string): Promise<void>;
}
