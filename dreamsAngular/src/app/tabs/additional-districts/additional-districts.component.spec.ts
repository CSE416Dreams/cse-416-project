import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalDistrictsComponent } from './additional-districts.component';

describe('AdditionalDistrictsComponent', () => {
  let component: AdditionalDistrictsComponent;
  let fixture: ComponentFixture<AdditionalDistrictsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalDistrictsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalDistrictsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
