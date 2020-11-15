import { TestBed } from '@angular/core/testing';

import { TheaterPerformanceService } from './theater-performance.service';

describe('TheaterPerformanceService', () => {
  let service: TheaterPerformanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TheaterPerformanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
