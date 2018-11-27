import { Component, OnInit, Input } from '@angular/core';

import { Character } from '../../shared/models/character.model';

@Component({
  selector: 'sl-characters-table',
  templateUrl: './characters-table.component.html',
  styleUrls: ['./characters-table.component.scss']
})
export class CharactersTableComponent implements OnInit {

  @Input() public characters: Character[];

  constructor() { }

  ngOnInit() {
  }

}
