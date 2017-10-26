import { TestBed, inject } from '@angular/core/testing';

import { CustomerEffectService } from './customer-effect.service';

describe('CustomerEffectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerEffectService]
    });
  });

  it('should be created', inject([CustomerEffectService], (service: CustomerEffectService) => {
    expect(service).toBeTruthy();
  }));
});
