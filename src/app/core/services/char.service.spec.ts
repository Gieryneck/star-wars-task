import { TestBed } from '@angular/core/testing';

import { CharService } from './char.service';

describe('CharService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CharService = TestBed.get(CharService);
    expect(service).toBeTruthy();
  });
});
