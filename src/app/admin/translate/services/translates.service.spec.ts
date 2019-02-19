import { TestBed } from '@angular/core/testing';

import { TranslatesService } from './translates.service';

describe('TranslatesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TranslatesService = TestBed.get(TranslatesService);
    expect(service).toBeTruthy();
  });
});
