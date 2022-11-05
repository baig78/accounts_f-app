import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DamagePurchasesComponent } from './damage-purchases.component';

describe('DamagePurchasesComponent', () => {
  let component: DamagePurchasesComponent;
  let fixture: ComponentFixture<DamagePurchasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DamagePurchasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DamagePurchasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
