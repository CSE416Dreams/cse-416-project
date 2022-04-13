import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopulationMeasureComponent } from './population-measure.component';

describe('PopulationMeasureComponent', () => {
  let component: PopulationMeasureComponent;
  let fixture: ComponentFixture<PopulationMeasureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopulationMeasureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopulationMeasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
