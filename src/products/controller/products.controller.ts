import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from '../service/products.service';
import { Product } from '../entity/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() products: Product[]) {
    try {
      const result = await this.productsService.createProducts(products);
      return result;
    } catch (error) {
      return { error: 'Erro no conrtoller ao criar produtos' };
    }
  }

  @Get()
  async findAll() {
    try {
      const result = await this.productsService.findAllProducts();
      return result;
    } catch (error) {
      return { error: 'Erro ao buscar produtos' };
    }
  }
}
