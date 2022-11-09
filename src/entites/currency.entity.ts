import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class CurrencyEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({
    type: 'decimal',
    name: 'price_usd',
  })
  priceUsd: number;
}
