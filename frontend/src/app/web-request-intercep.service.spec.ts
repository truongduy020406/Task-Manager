import { TestBed } from '@angular/core/testing';

import { WebRequestIntercepService } from './web-request-intercep.service';

describe('WebRequestIntercepService', () => {
  let service: WebRequestIntercepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebRequestIntercepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
