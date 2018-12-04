import { TestBed } from '@angular/core/testing';

import { SpeciesResolverService } from './species-resolver.service';

describe('SpeciesResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpeciesResolverService = TestBed.get(SpeciesResolverService);
    expect(service).toBeTruthy();
  });
});
