import { CountOrdersPriceByMonthPipe } from './count-orders-price-by-month.pipe';

describe('CountOrdersPriceByMonthPipe', () => {
  it('create an instance', () => {
    const pipe = new CountOrdersPriceByMonthPipe();
    expect(pipe).toBeTruthy();
  });
});
