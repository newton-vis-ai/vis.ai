import { TestBed } from '@angular/core/testing';

import { VegaliteService } from './vegalite.service';

describe('VegaliteService', () => {
  let service: VegaliteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VegaliteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
