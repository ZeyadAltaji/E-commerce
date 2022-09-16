/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttperorInterceptorService } from './httperor-interceptor.service';

describe('Service: HttperorInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttperorInterceptorService]
    });
  });

  it('should ...', inject([HttperorInterceptorService], (service: HttperorInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
