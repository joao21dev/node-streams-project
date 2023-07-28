import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'postgres',
      entities: [__dirname + '/entities/*.entity{.ts,.js}'], // Somente em ambiente de desenvolvimento. Desative em produção.
    }),
  ],
})
export class DatabaseModule {}
