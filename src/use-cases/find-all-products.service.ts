import { Injectable } from '@nestjs/common';
import { ProductsRepository } from 'src/repositories/products.repository';

@Injectable()
export class FindAllProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute() {
    try {
      const products = await this.productsRepository.findAll();
      return products;
    } catch (error) {
      throw new Error(error);
    }
  }
}
