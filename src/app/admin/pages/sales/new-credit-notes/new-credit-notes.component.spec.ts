import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCreditNotesComponent } from './new-credit-notes.component';

describe('NewCreditNotesComponent', () => {
  let component: NewCreditNotesComponent;
  let fixture: ComponentFixture<NewCreditNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCreditNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCreditNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
