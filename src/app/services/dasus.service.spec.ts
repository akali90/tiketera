import { TestBed } from '@angular/core/testing';

import { DasusService } from './dasus.service';

describe('DasusService', () => {
  let service: DasusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DasusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
