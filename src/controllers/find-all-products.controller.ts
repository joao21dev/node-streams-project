import { Controller, Get } from '@nestjs/common';
import { FindAllProductsService } from 'src/use-cases/find-all-products.service';

@Controller('products')
export class FindAllProductsController {
  constructor(
    private readonly findAllProductsService: FindAllProductsService,
  ) {}

  @Get()
  async execute() {
    try {
      const result = await this.findAllProductsService.execute();

      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
