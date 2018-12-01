import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'sl-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Output() public filterEmitter: EventEmitter<string> = new EventEmitter<string>();
  public filterValue = '';

  private readonly termSubject: Subject<string> = new Subject<string>();

  ngOnInit() {
    this.termSubject.pipe(
      debounceTime(200),
      distinctUntilChanged()
    ).subscribe(term => {
      this.filterEmitter.emit(term);
    });
  }

  public onKeyUp(term: string): void {
    this.filterValue = term;
    this.termSubject.next(term);
  }

  public handleClear(): void {
    this.filterValue = '';
    this.termSubject.next('');
  }
}
