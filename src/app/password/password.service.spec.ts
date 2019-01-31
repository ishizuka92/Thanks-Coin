import { TestBed, inject } from '@angular/core/testing';

import { PasswordService } from './password.service';

describe('ChangepasswordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PasswordService]
    });
  });

  it('should be created', inject([PasswordService], (service: ChangepasswordService) => {
    expect(service).toBeTruthy();
  }));
});
