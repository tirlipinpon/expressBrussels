import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasseOrderComponent } from './purchasse-order.component';

describe('PurchasseOrderComponent', () => {
  let component: PurchasseOrderComponent;
  let fixture: ComponentFixture<PurchasseOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasseOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasseOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
