import { TestBed, inject } from '@angular/core/testing';

import { PurchasseOrderEffectService } from './purchasse-order-effect.service';

describe('PurchasseOrderEffectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PurchasseOrderEffectService]
    });
  });

  it('should be created', inject([PurchasseOrderEffectService], (service: PurchasseOrderEffectService) => {
    expect(service).toBeTruthy();
  }));
});
