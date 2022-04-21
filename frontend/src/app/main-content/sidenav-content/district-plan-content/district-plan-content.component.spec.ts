import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictPlanContentComponent } from './district-plan-content.component';

describe('DistrictPlanContentComponent', () => {
  let component: DistrictPlanContentComponent;
  let fixture: ComponentFixture<DistrictPlanContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictPlanContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictPlanContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
