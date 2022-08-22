import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculateExchange'
})
export class CalculateExchangePipe implements PipeTransform {

  transform(exchangeRate: number, amount?: number, nominal = 1): number {
    if (exchangeRate && amount) {
      return +(amount * nominal / exchangeRate).toFixed(4);
    }
    return exchangeRate || 0;
  }

}
