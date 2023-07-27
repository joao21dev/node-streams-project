import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  key: string;

  @Column({ type: 'date', name: 'data_preco' })
  dataPreco: Date;

  @Column({ type: 'bigint', name: 'cod_produto' })
  codProduto: number;

  @Column({ type: 'varchar', length: 20 })
  sku: string;

  @Column({ type: 'float' })
  qtdEstoque: number;

  @Column({ type: 'float' })
  desconto: number;

  @Column({ type: 'timestamp', name: 'data_hora_insercao' })
  dataHoraInsercao: Date;

  @Column({ type: 'date', name: 'data_inicio' })
  dataInicio: Date;

  @Column({ type: 'date', name: 'data_fim' })
  dataFim: Date;
}
