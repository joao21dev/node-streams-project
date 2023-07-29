import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('uuid')
  key: string;

  @Column({ type: 'date', name: 'data_preco' })
  data_preco: string;

  @Column({ type: 'bigint', name: 'cod_produto' })
  cod_produto: number;

  @Column({ type: 'varchar', length: 20 })
  sku: string;

  @Column({ type: 'float' })
  qtd_estoque: number;

  @Column({ type: 'float' })
  desconto: number;

  @Column({ type: 'timestamp', name: 'data_hora_insercao' })
  data_hora_insercao: string;

  @Column({ type: 'date', name: 'data_inicio' })
  data_inicio: string;

  @Column({ type: 'date', name: 'data_fim' })
  data_fim: string;
}
