import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrencyEntity } from 'src/entites/currency.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(CurrencyEntity)
    private currencyRepository: Repository<CurrencyEntity>,
  ) {}

  async getAllCurrency(): Promise<CurrencyEntity[]> {
    return await this.currencyRepository.find();
  }

  async getCurrency(id: number): Promise<CurrencyEntity> {
    return await this.currencyRepository.findOne({ where: { id } });
  }

  async convertCurrency(
    from: string,
    to: string,
    amount: number,
  ): Promise<{ price: number }> {
    const fromUsd = await this.getPriceUsd(from);
    const toUsd = await this.getPriceUsd(to);
    const price = this.convertPrice(fromUsd, toUsd, amount);
    return { price };
  }

  async update(name: string, value: number): Promise<CurrencyEntity> {
    const item = await this.currencyRepository.findOne({ where: { name } });
    if (item) {
      item.priceUsd = value;
      return await this.currencyRepository.save(item);
    } else {
      const currency = new CurrencyEntity();
      currency.name = name;
      currency.priceUsd = value;
      return await this.currencyRepository.save(currency);
    }
  }

  private async getPriceUsd(name: string): Promise<number> {
    const currency = await this.currencyRepository.findOne({ where: { name } });
    if (currency) {
      return currency.priceUsd;
    }
  }

  private convertPrice(from: number, to: number, amount: number) {
    return (amount * to) / from;
  }

  async deleteCurrency(id: number) {
    const status = await this.currencyRepository.delete(id);
    if (status.affected == 0) {
      throw new NotFoundException('Currency not found!');
    }
  }

  async deleteAllCurrency() {
    await this.currencyRepository.clear();
  }
}
