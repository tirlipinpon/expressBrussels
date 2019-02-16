import { TestBed } from '@angular/core/testing';

import { OrderTranslateService } from './order-translate.service';

describe('OrderTranslateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderTranslateService = TestBed.get(OrderTranslateService);
    expect(service).toBeTruthy();
  });
});
