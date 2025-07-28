import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { CustomerOrmEntity } from '../../customer/entity/customer.orm-entity';

@Entity('favorite_products')
export class FavoriteProductsOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { name: 'customer_id' })
  customerId: string;

  @Column('int', { name: 'product_id' })
  productId: number;

  @ManyToOne(() => CustomerOrmEntity, (customer) => customer.favorites, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerOrmEntity;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;
}
