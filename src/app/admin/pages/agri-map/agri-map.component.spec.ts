import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgriMapComponent } from './agri-map.component';

describe('CategoriesComponent', () => {
  let component: AgriMapComponent;
  let fixture: ComponentFixture<AgriMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgriMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgriMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
