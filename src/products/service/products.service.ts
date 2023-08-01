import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Product } from '../entity/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transform, Writable } from 'stream';
import validateProductFields from 'src/utils/validateProductFields';
import { format } from 'date-fns';
import { ErrorLayerKind, MakeErrorProps, makeError } from 'src/utils/makeError';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  createTransform(validationFn: (product: Product) => string | null) {
    return new Transform({
      readableObjectMode: true,
      writableObjectMode: true,
      transform(chunk, encoding, callback) {
        const product = chunk as Product;
        const validationError = validationFn(product);
        if (validationError) {
          this.emit('error', new Error(validationError));
        }
        callback(null, product);
      },
    });
  }

  async createProducts(products: Product[]) {
    try {
      const currentTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
      this.logger.log(`Data e hora de acionamento: ${currentTime}`);
      this.logger.log(
        `Quantidade de produtos a serem inseridos: ${products.length}`,
      );

      const validationTransform = this.createTransform(validateProductFields);
      const newProducts: Product[] = [];

      for (const product of products) {
        validationTransform.write(product);
        newProducts.push(product);
      }

      validationTransform.end();

      const productsPerChunk = 1000;

      const writableStream = new Writable({
        objectMode: true,
        write: async (chunk, encoding, callback) => {
          try {
            const savedProducts = this.productRepository.create(chunk);
            await this.productRepository.save(savedProducts);

            callback();
          } catch (error) {
            callback(error);
          }
        },
      });

      let startIndex = 0;
      let totalProducts = 0;

      while (startIndex < newProducts.length) {
        const productsChunk = newProducts.slice(
          startIndex,
          startIndex + productsPerChunk,
        );
        const result = writableStream.write(productsChunk);

        if (!result) {
          await new Promise((resolve) => writableStream.once('drain', resolve));
        }

        startIndex += productsPerChunk;
        totalProducts += productsChunk.length;
      }

      writableStream.end();

      this.logger.log(`Número total de produtos salvos: ${totalProducts}`);

      return newProducts;
    } catch (error) {
      return error.message;
    }
  }

  async findAllProducts(
    rowCount: number,
    rowSkip: number,
  ): Promise<Product[] | MakeErrorProps> {
    try {
      const currentTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
      this.logger.log(`Data e hora de acionamento: ${currentTime}`);
      this.logger.log(`Solicitação do usuário: Recuperar todos os produtos`);

      const products = await this.productRepository.find({
        skip: rowSkip,
        take: rowCount,
      });

      if (products.length === 0) {
        this.logger.log(`Nenhum produto encontrado`);
        return makeError({
          message: 'Nenhum produto encontrado',
          layer: ErrorLayerKind.SERVICE_ERROR,
          status: HttpStatus.NOT_FOUND,
        });
      }

      this.logger.log(`Número de produtos encontrados: ${products.length}`);

      return products;
    } catch (error) {
      return makeError({
        message: error.message,
        layer: ErrorLayerKind.SERVICE_ERROR,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
