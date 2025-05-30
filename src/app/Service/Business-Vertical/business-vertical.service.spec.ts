import { TestBed } from '@angular/core/testing';

import { BusinessVerticalService } from './business-vertical.service';

describe('BusinessVerticalService', () => {
  let service: BusinessVerticalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessVerticalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
