import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IEOrderComponent } from './i-e-order.component';

describe('IEOrderComponent', () => {
  let component: IEOrderComponent;
  let fixture: ComponentFixture<IEOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IEOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IEOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
