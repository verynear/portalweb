import { TestBed, inject } from '@angular/core/testing';

import { NgbDateEnparserFormatterService } from './ngb-date-enparser-formatter.service';

describe('NgbDateEnparserFormatterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgbDateEnparserFormatterService]
    });
  });

  it('should be created', inject([NgbDateEnparserFormatterService], (service: NgbDateEnparserFormatterService) => {
    expect(service).toBeTruthy();
  }));
});
