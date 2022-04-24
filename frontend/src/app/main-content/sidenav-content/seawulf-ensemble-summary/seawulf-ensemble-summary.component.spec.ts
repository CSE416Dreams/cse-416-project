import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeawulfEnsembleSummaryComponent } from './seawulf-ensemble-summary.component';

describe('SeawulfEnsembleSummaryComponent', () => {
  let component: SeawulfEnsembleSummaryComponent;
  let fixture: ComponentFixture<SeawulfEnsembleSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeawulfEnsembleSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeawulfEnsembleSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
