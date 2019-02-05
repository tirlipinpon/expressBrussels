import { TestBed, inject } from '@angular/core/testing';

import { ClientZonesService } from './client-zones.service';

describe('ClientZonesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientZonesService]
    });
  });

  it('should be created', inject([ClientZonesService], (service: ClientZonesService) => {
    expect(service).toBeTruthy();
  }));
});
