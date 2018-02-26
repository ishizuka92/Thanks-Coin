import { TestBed, inject } from '@angular/core/testing';

import { HomeHistoryService } from './home-history.service';

describe('HomeHistoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomeHistoryService]
    });
  });

  it('should be created', inject([HomeHistoryService], (service: HomeHistoryService) => {
    expect(service).toBeTruthy();
  }));
});
