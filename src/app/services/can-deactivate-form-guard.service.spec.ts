import { TestBed, inject } from '@angular/core/testing';

import { CanDeactivateFormGuardService } from './can-deactivate-form-guard.service';

describe('CanDeactivateFormGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanDeactivateFormGuardService]
    });
  });

  it('should be created', inject([CanDeactivateFormGuardService], (service: CanDeactivateFormGuardService) => {
    expect(service).toBeTruthy();
  }));
});
