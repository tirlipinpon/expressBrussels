import { TestBed, inject } from '@angular/core/testing';
import {PrixZoneMotoEffectService} from "./prix-zone-moto.effect.service";


describe('PrixZoneMotoEffectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrixZoneMotoEffectService]
    });
  });

  it('should be created', inject([PrixZoneMotoEffectService], (service: PrixZoneMotoEffectService) => {
    expect(service).toBeTruthy();
  }));
});
