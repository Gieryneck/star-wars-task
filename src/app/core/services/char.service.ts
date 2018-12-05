import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Character } from '../../shared/models/character.model';
import { CharactersData } from '../../shared/models/charactersData.model';

@Injectable()
export class CharService {

  private charactersUrl = 'http://localhost:3000/characters';
  private speciesUrl = 'http://localhost:3000/species';
  private readonly resultsPerPage = 10;

  constructor(
    private http: HttpClient
  ) { }

  public getCharactersData(filter = '', page = 1, limit = this.resultsPerPage): Observable<CharactersData> {
    return this.http.get<Character[]>(
      this.charactersUrl, {observe: 'response', params: this.generateHttpParams(filter, page, limit)}
    ).pipe(
      map(res => {
        return {pagesCount: this.calcPagesCount(res.headers.get('X-Total-Count') ), characters: res.body };
      })
    );
  }

  private generateHttpParams(filter: string, page: number, limit: number): HttpParams {
    const params = {'q': filter, '_page': String(page), '_limit': String(limit)};
    return new HttpParams({fromObject: params});
  }

  private calcPagesCount(resultsCount: string): number {
    return Math.ceil( Number(resultsCount) / this.resultsPerPage);
  }

  public getSpecies(): Observable<string[]> {
    return this.http.get<string[]>(this.speciesUrl);
  }

  public addCharacter(character: Character): Observable<Character> {
    return this.http.post<Character>(this.charactersUrl, character);
  }

}
