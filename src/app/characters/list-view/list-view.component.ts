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
  public currentPage = 1;
  constructor(private charService: CharService) {}

  ngOnInit() {
    this.getCharactersData('', 1);
  }

  public handlePageChange(page: number): void {
    this.currentPage = page;
    this.getCharactersData('', page);
  }

  private getCharactersData(filter: string, page: number): void {
    this.charactersData$ = this.charService.getCharactersData(filter, page).pipe(
      tap(console.log)
    );
  }

}
