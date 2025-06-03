import { TestBed } from '@angular/core/testing';

import { InventryService } from './inventry.service';

describe('InventryService', () => {
  let service: InventryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
