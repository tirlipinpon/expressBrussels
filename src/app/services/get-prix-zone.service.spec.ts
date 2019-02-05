import { TestBed, inject } from '@angular/core/testing';

import { GetPrixZoneService } from './get-prix-zone.service';

describe('GetPrixZoneService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetPrixZoneService]
    });
  });

  it('should be created', inject([GetPrixZoneService], (service: GetPrixZoneService) => {
    expect(service).toBeTruthy();
  }));
});
