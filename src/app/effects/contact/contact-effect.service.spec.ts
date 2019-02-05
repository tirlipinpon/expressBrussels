import { TestBed, inject } from '@angular/core/testing';

import { ContactEffectService } from './contact-effect.service';

describe('ContactEffectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContactEffectService]
    });
  });

  it('should be created', inject([ContactEffectService], (service: ContactEffectService) => {
    expect(service).toBeTruthy();
  }));
});
