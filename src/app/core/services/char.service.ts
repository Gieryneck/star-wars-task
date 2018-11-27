import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Character } from '../../shared/models/character.model';
import { CharactersData } from '../../shared/models/charactersData.model';

@Injectable()
export class CharService {

  private charactersUrl = 'http://localhost:3000/characters/';

  constructor(
    private http: HttpClient
  ) { }

  public getCharactersData(): Observable<CharactersData> {
    return this.http.get<Character[]>(
      this.charactersUrl, {observe: 'response', params: this.generateHttpParams()}
    ).pipe(
      map(res => {
        return {resultsCount: res.headers.get('X-Total-Count'), characters: res.body };
      })
    );
  }

  private generateHttpParams(filter: string = '', page: string = '1'): HttpParams {
    const params = {'q': filter, '_page': page};

    return new HttpParams({fromObject: params});
  }

}
