import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProoductListComponent } from './product-list.component';

describe('NeedsComponent', () => {
  let component: ProoductListComponent;
  let fixture: ComponentFixture<ProoductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProoductListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProoductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
