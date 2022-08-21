import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculateExchange'
})
export class CalculateExchangePipe implements PipeTransform {

  transform(exchangeRate: number, amount: number | null, nominal = 1): number {
    if (amount) {
      return +(amount * nominal / exchangeRate).toFixed(4);
    }
    return exchangeRate
  }

}
