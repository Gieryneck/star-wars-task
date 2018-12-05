import { TestBed } from '@angular/core/testing';

import { CharService } from './char.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CharService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [CharService]
  }));

  it('should be created', () => {
    const service: CharService = TestBed.get(CharService);
    expect(service).toBeTruthy();
  });
});
