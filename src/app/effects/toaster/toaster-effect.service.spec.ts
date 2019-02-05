import { TestBed } from '@angular/core/testing';

import { ToasterEffectService } from './toaster-effect.service';

describe('ToasterEffectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToasterEffectService = TestBed.get(ToasterEffectService);
    expect(service).toBeTruthy();
  });
});
