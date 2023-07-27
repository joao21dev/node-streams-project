import { Body, Controller, Post } from '@nestjs/common';
import { Product } from 'src/entities/product.entity';
import { CreateProductsService } from 'src/use-cases/create-products.service';

@Controller('products')
export class CreateProductsController {
  constructor(private readonly createProductsService: CreateProductsService) {}

  @Post()
  async execute(@Body() products: Product[]) {
    try {
      const result = await this.createProductsService.execute(products);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
