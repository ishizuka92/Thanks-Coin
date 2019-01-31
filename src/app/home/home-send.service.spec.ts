import { TestBed, inject } from '@angular/core/testing';

import { HomeSendService } from './home-send.service';

describe('HomeSendService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomeSendService]
    });
  });

  it('should be created', inject([HomeSendService], (service: HomeSendService) => {
    expect(service).toBeTruthy();
  }));
});
