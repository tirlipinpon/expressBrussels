import { TestBed, inject } from '@angular/core/testing';
import {PrixZoneCamionetteEffectService} from "./prix-zone-camionette.effect.service";


describe('PrixZoneCamionetteEffectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrixZoneCamionetteEffectService]
    });
  });

  it('should be created', inject([PrixZoneCamionetteEffectService], (service: PrixZoneCamionetteEffectService) => {
    expect(service).toBeTruthy();
  }));
});
