import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FertilizerCalculatorComponent } from './fertilizer-calculator.component';

describe('FertilizerCalculatorComponent', () => {
  let component: FertilizerCalculatorComponent;
  let fixture: ComponentFixture<FertilizerCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FertilizerCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FertilizerCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
