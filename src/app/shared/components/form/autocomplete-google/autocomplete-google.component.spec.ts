import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteGoogleComponent } from './autocomplete-google.component';

describe('AutocompleteGoogleComponent', () => {
  let component: AutocompleteGoogleComponent;
  let fixture: ComponentFixture<AutocompleteGoogleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteGoogleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
