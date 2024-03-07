import { TestBed } from '@angular/core/testing';

import { SMSServiceService } from './smsservice.service';

describe('SMSServiceService', () => {
  let service: SMSServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SMSServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
