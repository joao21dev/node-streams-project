import { Injectable } from '@nestjs/common';
import { Product } from '../entity/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async createProducts(products: Product[]) {
    try {
      const newProducts = this.productRepository.create(products);
      await this.productRepository.save(newProducts);
      return newProducts;
    } catch (error) {
      console.log('Erro ao criar produtos:', error);
      throw new Error(error);
    }
  }

  async findAllProducts() {
    try {
      const products = await this.productRepository.find();
      return products;
    } catch (error) {
      throw new Error(error);
    }
  }
}
