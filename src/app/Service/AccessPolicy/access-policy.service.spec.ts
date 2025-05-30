import { TestBed } from '@angular/core/testing';

import { AccessPolicyService } from './access-policy.service';

describe('AccessPolicyService', () => {
  let service: AccessPolicyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccessPolicyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
