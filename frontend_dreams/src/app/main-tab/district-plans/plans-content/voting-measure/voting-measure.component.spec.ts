import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingMeasureComponent } from './voting-measure.component';

describe('VotingMeasureComponent', () => {
  let component: VotingMeasureComponent;
  let fixture: ComponentFixture<VotingMeasureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotingMeasureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingMeasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
