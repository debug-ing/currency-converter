import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DB_CONFIG } from './config/db';
import { CurrencyModule } from './module/currency/currency.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(DB_CONFIG),
    CurrencyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
