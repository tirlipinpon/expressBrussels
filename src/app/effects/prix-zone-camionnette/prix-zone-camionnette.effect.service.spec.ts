import { TestBed, inject } from '@angular/core/testing';
import {PrixZoneCamionnetteEffectService} from "./prix-zone-camionnette.effect.service";


describe('PrixZoneCamionnetteEffectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrixZoneCamionnetteEffectService]
    });
  });

  it('should be created', inject([PrixZoneCamionnetteEffectService], (service: PrixZoneCamionnetteEffectService) => {
    expect(service).toBeTruthy();
  }));
});
