import { TestBed, inject } from '@angular/core/testing';

import { RemovalService } from './removal.service';

describe('RemovalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RemovalService]
    });
  });

  it('should be created', inject([RemovalService], (service: RemovalService) => {
    expect(service).toBeTruthy();
  }));
});
