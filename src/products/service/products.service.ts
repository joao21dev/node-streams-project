import { Injectable } from '@nestjs/common';
import { Product } from '../entity/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transform } from 'stream';
import validateProductFields from 'src/utils/validateProductFields';
import { Writable } from 'typeorm/platform/PlatformTools';

@Injectable()
export class ProductsService {
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
      const validationTransform = this.createTransform(validateProductFields);
      const newProducts: Product[] = [];

      for (const product of products) {
        validationTransform.write(product);
        newProducts.push(product);
      }

      validationTransform.end();

      // Criar uma stream de escrita para enviar os produtos em lotes
      const linesPerBatch = 10000; // Tamanho do lote em linhas (10 mil linhas)
      let linesSaved = 0; // Contador para as linhas salvas
      const writableStream = new Writable({
        objectMode: true,
        write: async (chunk, encoding, callback) => {
          try {
            const savedProducts = this.productRepository.create(chunk);
            await this.productRepository.save(savedProducts);

            // Incrementa o contador com a quantidade de linhas salvas no lote atual
            linesSaved += chunk.length;
            console.log(`Linhas salvas no lote atual: ${linesSaved}`); // <-- Adiciona o console.log aqui

            callback();
          } catch (error) {
            callback(error);
          }
        },
      });

      // Dividir e enviar os produtos em lotes
      let startIndex = 0;
      let totalLinesSaved = 0; // Contador para o número total de linhas salvas

      while (startIndex < newProducts.length) {
        const linesBatch = newProducts.slice(
          startIndex,
          startIndex + linesPerBatch,
        );
        const result = writableStream.write(linesBatch);

        // Se o buffer interno estiver cheio, aguardar o esvaziamento antes de continuar
        if (!result) {
          await new Promise((resolve) => writableStream.once('drain', resolve));
        }

        startIndex += linesPerBatch;
        totalLinesSaved += linesBatch.length; // Atualiza o contador total
      }

      writableStream.end();

      console.log(`Número total de linhas salvas: ${totalLinesSaved}`); // <-- Adiciona o console.log aqui

      return newProducts;
    } catch (error) {
      return error.message;
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
