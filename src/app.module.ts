import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { AppController } from './app.controller';

@Module({
  imports: [ProductsModule, DatabaseModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
