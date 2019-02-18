import { TestBed } from '@angular/core/testing';

import { OrderIEService } from './order-i-e.service';

describe('OrderIEService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderIEService = TestBed.get(OrderIEService);
    expect(service).toBeTruthy();
  });
});
