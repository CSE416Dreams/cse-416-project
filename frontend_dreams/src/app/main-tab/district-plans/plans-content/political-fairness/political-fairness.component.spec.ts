import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticalFairnessComponent } from './political-fairness.component';

describe('PoliticalFairnessComponent', () => {
  let component: PoliticalFairnessComponent;
  let fixture: ComponentFixture<PoliticalFairnessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoliticalFairnessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliticalFairnessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
