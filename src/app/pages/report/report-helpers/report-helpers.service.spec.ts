import { TestBed, inject } from '@angular/core/testing';

import { ReportHelpersService } from './report-helpers.service';

describe('ReportHelpersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportHelpersService]
    });
  });

  it('should be created', inject([ReportHelpersService], (service: ReportHelpersService) => {
    expect(service).toBeTruthy();
  }));
});
