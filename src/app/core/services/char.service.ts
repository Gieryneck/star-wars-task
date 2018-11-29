import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Character } from '../../shared/models/character.model';
import { CharactersData } from '../../shared/models/charactersData.model';

@Injectable()
export class CharService {

  private charactersUrl = 'http://localhost:3000/characters/';
  private readonly resultsPerPage = 1;

  constructor(
    private http: HttpClient
  ) { }

  public getCharactersData(): Observable<CharactersData> {
    return this.http.get<Character[]>(
      this.charactersUrl, {observe: 'response', params: this.generateHttpParams()}
    ).pipe(
      map(res => {
        return {pagesCount: this.calcPagesCount( Number(res.headers.get('X-Total-Count')) ), characters: res.body };
      })
    );
  }

  private generateHttpParams(filter: string = '', page: string = '1', limit: string = String(this.resultsPerPage)): HttpParams {
    const params = {'q': filter, '_page': page, '_limit': limit};

    return new HttpParams({fromObject: params});
  }

  private calcPagesCount(resultsCount: number): number {
    return Math.ceil(resultsCount / this.resultsPerPage);
  }

}
