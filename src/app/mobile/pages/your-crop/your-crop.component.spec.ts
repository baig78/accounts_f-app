import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourCropComponent } from './your-crop.component';

describe('YourCropComponent', () => {
  let component: YourCropComponent;
  let fixture: ComponentFixture<YourCropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourCropComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourCropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
