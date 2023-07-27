import { Injectable } from '@nestjs/common';
import { Product } from 'src/entities/product.entity';
import { ProductsRepository } from 'src/repositories/products.repository';

Injectable();
export class CreateProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(products: Product[]) {
    try {
      const productsCreated = await this.productsRepository.create(products);
      return productsCreated;
    } catch (error) {
      throw new Error(error);
    }
  }
}
