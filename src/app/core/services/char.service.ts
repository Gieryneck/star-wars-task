import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class CharService {

  private readonly charactersUrl: string = `http://localhost:3000/characters`;

  constructor(
    private http: HttpClient
  ) { }

  public getCharacters(): Observable<any> {
    return this.http.get(this.charactersUrl);
  }

}
