import { ApiProperty } from '@nestjs/swagger';

export class ProductNotFoundDoc {
  @ApiProperty({
    example: 'Produto não encontrado',
  })
  message: string;

  @ApiProperty({
    example: 'SERVICE_ERROR',
  })
  layer: string;

  @ApiProperty({
    example: 404,
  })
  status: number;
}
