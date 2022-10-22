import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CultivationTipsComponent } from './cultivation-tips.component';

describe('CultivationTipsComponent', () => {
  let component: CultivationTipsComponent;
  let fixture: ComponentFixture<CultivationTipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CultivationTipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CultivationTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
