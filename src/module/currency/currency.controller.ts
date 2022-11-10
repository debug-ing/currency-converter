import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { ConvertCurrencyDto, UpdateCurrencyDto } from './dto';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get()
  getAllCurrency() {
    return this.currencyService.getAllCurrency();
  }

  @Get(':id')
  getCurrency(@Param('id', ParseIntPipe) id: number) {
    return this.currencyService.getCurrency(id);
  }

  @Post('convert')
  convert(@Body() body: ConvertCurrencyDto) {
    return this.currencyService.convertCurrency(
      body.from,
      body.to,
      body.amount,
    );
  }

  @Post('update')
  update(@Body() body: UpdateCurrencyDto) {
    return this.currencyService.update(body.name, body.usd);
  }

  @Delete('all')
  deleteAllCurrency() {
    return this.currencyService.deleteAllCurrency();
  }

  @Delete(':id')
  deleteCurrency(@Param('id', ParseIntPipe) id: number) {
    return this.currencyService.deleteCurrency(id);
  }
}
