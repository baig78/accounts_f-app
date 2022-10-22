import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DukaanComponent } from './dukaan.component';

describe('DukaanComponent', () => {
  let component: DukaanComponent;
  let fixture: ComponentFixture<DukaanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DukaanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DukaanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
