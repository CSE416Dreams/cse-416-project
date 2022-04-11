import { TestBed } from '@angular/core/testing';

import { ComponentControllerService } from './component-controller.service';

describe('ComponentControllerService', () => {
  let service: ComponentControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
