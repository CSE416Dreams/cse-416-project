import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxAndWhiskerComponent } from './box-and-whisker.component';

describe('BoxAndWhiskerComponent', () => {
  let component: BoxAndWhiskerComponent;
  let fixture: ComponentFixture<BoxAndWhiskerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxAndWhiskerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxAndWhiskerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
