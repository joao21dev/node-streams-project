import { Injectable } from '@nestjs/common';
import { Product } from '../entity/product.entity';

@Injectable()
export class ProductsService {
  async create(products: Product[]) {
    try {
      const productsCreated = await this.create(products);
      return productsCreated;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      const products = await this.findAll();
      return products;
    } catch (error) {
      throw new Error(error);
    }
  }
}
