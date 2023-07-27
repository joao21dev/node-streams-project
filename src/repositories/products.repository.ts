import { Product } from 'src/entities/product.entity';

export abstract class ProductsRepository {
  abstract findAll(): Promise<Product[]>;
  abstract create(products: Product[]): Promise<Product[]>;
}
