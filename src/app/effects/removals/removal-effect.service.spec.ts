import { TestBed, inject } from '@angular/core/testing';

import { RemovalEffectService } from './removal-effect.service';

describe('CustomerEffectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RemovalEffectService]
    });
  });

  it('should be created', inject([RemovalEffectService], (service: RemovalEffectService) => {
    expect(service).toBeTruthy();
  }));
});
