import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { ProductsService } from '../service/products.service';
import { Product } from '../entity/product.entity';
import { ErrorLayerKind, MakeErrorProps, makeError } from 'src/utils/makeError';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductSuccessDoc } from '../docs/product-success.doc';
import { ProductNotFoundDoc } from '../docs/product-not-found.doc';
import { ProductBadRequestDoc } from '../docs/product-bad-request';

@ApiTags('Produtos')
@Controller('produtos')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar produtos',
    description: 'Endpoint para criar produtos.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Array contendo os produtos criados',
    type: ProductSuccessDoc,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Erro de requisição',
    type: ProductBadRequestDoc,
  })
  async create(@Body() products: Product[] | MakeErrorProps) {
    if ((products as MakeErrorProps).layer) {
      return products as MakeErrorProps;
    }

    if (!Array.isArray(products)) {
      return makeError({
        message: 'O corpo da requisição deve ser um array de produtos',
        layer: ErrorLayerKind.CONTROLLER_ERROR,
        status: 400, // Bad Request
      });
    }

    const result = await this.productsService.createProducts(
      products as Product[],
    );

    if ((result as MakeErrorProps).layer) {
      return result as MakeErrorProps;
    }

    return result as Product[];
  }

  @Get()
  @ApiOperation({
    summary: 'Recuperar todos os produtos',
    description:
      'Endpoint para recuperar todos os produtos, com opção de paginação utilizando os parâmetros row_skip e row_count.',
  })
  @ApiQuery({
    name: 'row_count',
    type: Number,
    required: false,
    description:
      'Número de produtos a serem retornados por requisição. O padrão é 10.',
  })
  @ApiQuery({
    name: 'row_skip',
    type: Number,
    required: false,
    description:
      'Número de produtos a serem ignorados a partir do início da lista de produtos.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Array contendo os produtos encontrados',
    type: ProductSuccessDoc,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Nenhum produto encontrado',
    type: ProductNotFoundDoc,
  })
  async findAll(
    @Query('row_count') rowCount = 10,
    @Query('row_skip') rowSkip = 0,
  ) {
    const result = await this.productsService.findAllProducts(
      rowCount,
      rowSkip,
    );

    if (typeof result === 'string') {
      return result;
    }

    return result as Product[];
  }
}
