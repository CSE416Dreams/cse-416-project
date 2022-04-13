import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompactnessComponent } from './compactness.component';

describe('CompactnessComponent', () => {
  let component: CompactnessComponent;
  let fixture: ComponentFixture<CompactnessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompactnessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompactnessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
