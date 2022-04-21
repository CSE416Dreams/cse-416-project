import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateSummaryComponent } from './state-summary.component';

describe('StateSummaryComponent', () => {
  let component: StateSummaryComponent;
  let fixture: ComponentFixture<StateSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StateSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
