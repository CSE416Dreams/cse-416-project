import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictPlansComponent } from './district-plans.component';

describe('DistrictPlansComponent', () => {
  let component: DistrictPlansComponent;
  let fixture: ComponentFixture<DistrictPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictPlansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
