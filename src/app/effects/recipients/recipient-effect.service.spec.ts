import { TestBed, inject } from '@angular/core/testing';

import { RecipientEffectService } from './recipient-effect.service';

describe('CustomerEffectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecipientEffectService]
    });
  });

  it('should be created', inject([RecipientEffectService], (service: RecipientEffectService) => {
    expect(service).toBeTruthy();
  }));
});
