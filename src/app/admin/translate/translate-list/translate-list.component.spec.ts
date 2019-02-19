import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateListComponent } from './translate-list.component';

describe('TranslateListComponent', () => {
  let component: TranslateListComponent;
  let fixture: ComponentFixture<TranslateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
