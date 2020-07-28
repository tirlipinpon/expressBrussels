import { TestBed, inject } from '@angular/core/testing';

import { OrderIEService } from './order-ie.service';

describe('OrderIEService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderIEService]
    });
  });

  it('should be created', inject([OrderIEService], (service: OrderIEService) => {
    expect(service).toBeTruthy();
  }));
});
