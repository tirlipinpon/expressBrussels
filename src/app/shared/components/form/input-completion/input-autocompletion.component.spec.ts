import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputAutocompletionComponent } from './input-autocompletion.component';

describe('InputAutocompletionComponent', () => {
  let component: InputAutocompletionComponent;
  let fixture: ComponentFixture<InputAutocompletionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputAutocompletionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputAutocompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
