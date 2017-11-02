import { TestBed, inject } from '@angular/core/testing';

import { AlwaysAuthGuardService } from './always-auth-guard.service';

describe('AlwaysAuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlwaysAuthGuardService]
    });
  });

  it('should be created', inject([AlwaysAuthGuardService], (service: AlwaysAuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
