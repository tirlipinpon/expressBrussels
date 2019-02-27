import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportExportListComponent } from './i-e-list.component';

describe('ImportExportListComponent', () => {
  let component: ImportExportListComponent;
  let fixture: ComponentFixture<ImportExportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportExportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportExportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
