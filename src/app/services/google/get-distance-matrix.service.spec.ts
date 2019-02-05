import { TestBed, inject } from '@angular/core/testing';

import { GetDistanceMatrixService } from './get-distance-matrix.service';

describe('GetDistanceMatrixService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetDistanceMatrixService]
    });
  });

  it('should be created', inject([GetDistanceMatrixService], (service: GetDistanceMatrixService) => {
    expect(service).toBeTruthy();
  }));
});
