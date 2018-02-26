import { TestBed, inject } from '@angular/core/testing';

import { ClientZonesEffectService } from './client-zones-effect.service';

describe('ClientZonesEffectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientZonesEffectService]
    });
  });

  it('should be created', inject([ClientZonesEffectService], (service: ClientZonesEffectService) => {
    expect(service).toBeTruthy();
  }));
});
