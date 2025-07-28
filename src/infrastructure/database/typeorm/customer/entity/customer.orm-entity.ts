import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FavoriteProductsOrmEntity } from '../../favorite-product/entity/favorite-product.orm-entity';

@Entity('customers')
export class CustomerOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'now()' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date | undefined;

  @OneToMany(() => FavoriteProductsOrmEntity, (fav) => fav.customer, {
    cascade: true,
  })
  favorites: FavoriteProductsOrmEntity[];
}
