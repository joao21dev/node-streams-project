import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('uuid')
  key: string;

  @Column({ name: 'data_preco' })
  data_preco: string;

  @Column({ type: 'bigint', name: 'cod_produto' })
  cod_produto: number;

  @Column({ length: 20 })
  sku: string;

  @Column()
  qtd_estoque: number;

  @Column()
  desconto: number;

  @Column({ name: 'data_hora_insercao' })
  data_hora_insercao: string;

  @Column({ name: 'data_inicio' })
  data_inicio: string;

  @Column({ name: 'data_fim' })
  data_fim: string;
}
