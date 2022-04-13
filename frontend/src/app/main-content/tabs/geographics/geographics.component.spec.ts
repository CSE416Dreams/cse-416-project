import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeographicsComponent } from './geographics.component';

describe('GeographicsComponent', () => {
  let component: GeographicsComponent;
  let fixture: ComponentFixture<GeographicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeographicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeographicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
