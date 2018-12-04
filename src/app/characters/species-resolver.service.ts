import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { CharService } from '../core/services/char.service';
import { Observable, EMPTY, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpeciesResolverService implements Resolve<string[]> {

  constructor(private charService: CharService, private router: Router) {}

  resolve(): Observable<string[]> | Observable<never> {
    return this.charService.getSpecies().pipe(
      take(1),
      mergeMap(species => {
        if (species) {
          return of(species);
        } else {
          this.router.navigate(['/listview']);
          return EMPTY;
        }
      })
    );
  }
}

