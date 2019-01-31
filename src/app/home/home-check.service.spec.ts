import { TestBed, inject } from '@angular/core/testing';

import { HomeCheckService } from './home-check.service';

describe('AssetsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomeCheckService]
    });
  });

  it('should be created', inject([HomeCheckService], (service: AssetsService) => {
    expect(service).toBeTruthy();
  }));
});
