import { TestBed } from '@angular/core/testing';

import { PrixZoneService } from './prix-zone.service';

describe('PrixZoneService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrixZoneService = TestBed.get(PrixZoneService);
    expect(service).toBeTruthy();
  });
});
