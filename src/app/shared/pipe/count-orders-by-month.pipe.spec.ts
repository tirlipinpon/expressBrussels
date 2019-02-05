import { CountOrdersByMonthPipe } from './count-orders-by-month.pipe';

describe('CountOrdersByMonthPipe', () => {
  it('create an instance', () => {
    const pipe = new CountOrdersByMonthPipe();
    expect(pipe).toBeTruthy();
  });
});
