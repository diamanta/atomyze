import { CalculateExchangePipe } from './calculate-exchange.pipe';

describe('CalculateExchangePipe', () => {
  let pipe: CalculateExchangePipe
  beforeEach(() => {
    pipe = new CalculateExchangePipe();
  })

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('return exchange rate without given amount', () => {
    const rate = 42;
    expect(pipe.transform(rate)).toEqual(rate)
  })

  it('return amount of target currency when given amount of rubles', () => {
    const rate = 42;
    const amount = 84;
    const nominal = 100
    expect(pipe.transform(rate, amount)).toEqual(2)
    expect(pipe.transform(rate, amount, nominal)).toEqual(200)
  })

  it('return 0 when not given an exchange rate', () => {
    expect(pipe.transform(null as any)).toEqual(0)
  })
});
