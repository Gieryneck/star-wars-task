import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Character } from '../../shared/models/character.model';
import { CharactersData } from '../../shared/models/charactersData.model';

@Injectable()
export class CharService {

  private charactersUrl = 'http://localhost:3000/characters/';
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

}
