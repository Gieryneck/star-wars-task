import { Component, OnInit } from '@angular/core';

import { CharService } from '../../core/services/char.service';

@Component({
  selector: 'sl-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {

  constructor( private charService: CharService) {}

  ngOnInit() {}
}
