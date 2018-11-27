import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CharService } from '../../core/services/char.service';
import { CharactersData } from '../../shared/models/charactersData.model';


@Component({
  selector: 'sl-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {

  public charactersData$: Observable<CharactersData>;

  constructor(private charService: CharService) {}

  ngOnInit() {
    this.charactersData$ = this.charService.getCharactersData().pipe(
      tap(console.log)
    );
  }

}
