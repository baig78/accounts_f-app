import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PestsDiseasesComponent } from './pests-diseases.component';

describe('PestsDiseasesComponent', () => {
  let component: PestsDiseasesComponent;
  let fixture: ComponentFixture<PestsDiseasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PestsDiseasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PestsDiseasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
