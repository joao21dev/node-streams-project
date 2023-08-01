// product.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsString,
  IsNumber,
  IsDate,
  IsNotEmpty,
  Min,
} from 'class-validator';

export class ProductSuccessDoc {
  @ApiProperty({ example: 'fa494ffb-0af7-4bee-985c-556e5e90721f' })
  @IsNotEmpty()
  @IsUUID()
  key: string;

  @ApiProperty({ example: '2023-08-01' })
  @IsNotEmpty()
  @IsDate()
  data_preco: string;

  @ApiProperty({ example: 9999999999999 })
  @IsNotEmpty()
  @IsNumber()
  cod_produto: number;

  @ApiProperty({ example: 'PZ0912' })
  @IsNotEmpty()
  @IsString()
  sku: string;

  @ApiProperty({ example: 10 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  qtd_estoque: number;

  @ApiProperty({ example: 0 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  desconto: number;

  @ApiProperty({ example: '2023-07-01 00:00:00' })
  @IsNotEmpty()
  @IsDate()
  data_hora_insercao: string;

  @ApiProperty({ example: '2023-07-01' })
  @IsNotEmpty()
  @IsDate()
  data_inicio: string;

  @ApiProperty({ example: '2023-07-31' })
  @IsNotEmpty()
  @IsDate()
  data_fim: string;
}
