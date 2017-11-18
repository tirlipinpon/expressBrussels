import { TestBed, inject } from '@angular/core/testing';

import { OrdersEffectService } from './orders-effect.service';

describe('OrdersEffectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrdersEffectService]
    });
  });

  it('should be created', inject([OrdersEffectService], (service: OrdersEffectService) => {
    expect(service).toBeTruthy();
  }));
});
