import { TestBed, inject } from '@angular/core/testing';

import { AuthHeaderInterceptor } from './auth-header.interceptor';

describe('AuthHeaderInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthHeaderInterceptor]
    });
  });

  it('should be created', inject([AuthHeaderInterceptor], (service: AuthHeaderInterceptor) => {
    expect(service).toBeTruthy();
  }));
});
