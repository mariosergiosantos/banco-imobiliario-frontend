import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { SalaService } from './sala.service';

describe('SalaService', () => {
  let service: SalaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SalaService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(SalaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
