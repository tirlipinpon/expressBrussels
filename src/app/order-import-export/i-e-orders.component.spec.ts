import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportExportOrdersComponent } from './i-e-orders.component';

describe('ImportExportOrdersComponent', () => {
  let component: ImportExportOrdersComponent;
  let fixture: ComponentFixture<ImportExportOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportExportOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportExportOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
