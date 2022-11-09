import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DB_CONFIG } from './config/db';
import { CurrencyModule } from './module/currency/currency.module';
import { TransformInterceptor } from './shared/transform.interceptor';

@Module({
  imports: [TypeOrmModule.forRoot(DB_CONFIG), CurrencyModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
