import { Component, Input, EventEmitter, Output, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'sl-table-nav',
  templateUrl: './table-nav.component.html',
  styleUrls: ['./table-nav.component.scss']
})
export class TableNavComponent implements OnInit, OnChanges {

  @Input() public pagesCount: number;
  @Output() public pageChangeEmitter: EventEmitter<number> = new EventEmitter<number>();
  public currentPage = 1;
  public navArray: number[];

  private readonly maxNavArrayLength = 5;

  constructor() { }

  ngOnInit() {
    this.generateNavArray();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.pagesCount) {
      this.currentPage = 1;
      this.generateNavArray();
    }
  }

  public handleNextButton(): void {
    if (this.currentPage < this.pagesCount) {
      this.handlePageChange(this.currentPage + 1);
    }
  }

  public handlePreviousButton(): void {
    if (this.currentPage > 1) {
      this.handlePageChange(this.currentPage - 1);
    }
  }

  public handlePageChange(page: number): void {
    if (page === this.currentPage) { return; }

    this.currentPage = page;
    this.pageChangeEmitter.emit(this.currentPage);
    this.generateNavArray();
  }

  private generateNavArray(): void {
    const arrayLength = this.pagesCount > this.maxNavArrayLength ? this.maxNavArrayLength : this.pagesCount;
    const halfArray = Math.floor(arrayLength / 2);
    const arrIsOddModyfier = arrayLength % 2 === 1 ? 1 : 0;

    const array = [];
    for (
      let i = this.currentPage - halfArray;
        i < this.currentPage + halfArray + arrIsOddModyfier;
        i++) {
      array.push(i);
    }

    const offLeft = array[0] < 1 ? 1 - array[0] : 0;
    const offRight = (array[array.length - 1] > this.pagesCount) ? (array[array.length - 1] - this.pagesCount) : 0;

    this.navArray = offLeft ? array.map(x => x + offLeft) : offRight ? array.map(x => x - offRight) : array;
  }

}
