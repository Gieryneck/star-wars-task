import { Component, OnInit } from '@angular/core';

import { CharService } from '../../core/services/char.service';
import { Character } from '../../shared/models/character.model';


@Component({
  selector: 'sl-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {

  public characters: Character[];
  public pagesCount: number;
  private filteringTerm = '';

  constructor(private charService: CharService) { }

  ngOnInit() {
    this.getCharactersData();
  }

  public handlePageChange(page: number): void {
    this.getCharactersData(this.filteringTerm, page);
  }

  public handleFiltering(term): void {
    this.filteringTerm = term;
    this.getCharactersData(this.filteringTerm);
  }

  private getCharactersData(filter?: string, page?: number): void {
    this.charService.getCharactersData(filter, page)
      .subscribe(data => {
        this.characters = data.characters;
        this.pagesCount = data.pagesCount;
      });
  }

}
