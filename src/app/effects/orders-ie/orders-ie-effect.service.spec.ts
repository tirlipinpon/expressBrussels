import { TestBed, inject } from '@angular/core/testing';

import { OrdersIEEffectService } from './orders-ie-effect.service';

describe('OrdersIEEffectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrdersIEEffectService]
    });
  });

  it('should be created', inject([OrdersIEEffectService], (service: OrdersIEEffectService) => {
    expect(service).toBeTruthy();
  }));
});
