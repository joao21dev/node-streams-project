import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ProductsService } from '../service/products.service';
import { Product } from '../entity/product.entity';
import { ErrorLayerKind, MakeErrorProps, makeError } from 'src/utils/makeError';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
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
