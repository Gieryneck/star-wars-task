import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'sl-table-nav',
  templateUrl: './table-nav.component.html',
  styleUrls: ['./table-nav.component.scss']
})
export class TableNavComponent implements OnInit {

  @Input() public set pCount(value: number) {
    this.pagesCount = value;
    this.generateNavArray();
  }
  @Output() public pageChangeEmitter: EventEmitter<number> = new EventEmitter<number>();
  public pagesCount: number;
  public currentPage = 1;
  public navArray: number[];

  private readonly maxNavArrayLength = 5;

  constructor() { }

  ngOnInit() {}

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
    this.currentPage = page;
    this.pageChangeEmitter.emit(this.currentPage);
    this.generateNavArray();
  }

  private generateNavArray(): void {
    const base = [];
    const navArrayLength = this.pagesCount > this.maxNavArrayLength ? this.maxNavArrayLength : this.pagesCount;
    const distFromArrCenter = Math.floor(navArrayLength / 2);
    const navArrIsOddModyfier = navArrayLength % 2 === 1 ? 1 : 0;

    for (let i = 1 - distFromArrCenter; i <= this.pagesCount + distFromArrCenter + 1; i++) {
      base.push(i);
    }

    const spreadLeft = base.indexOf(this.currentPage - distFromArrCenter);
    const spreadRight = base.indexOf(this.currentPage + distFromArrCenter + navArrIsOddModyfier);

    const newArray = base.slice(spreadLeft, spreadRight);

    const offRight = newArray[newArray.length - 1] - this.pagesCount > 0 ? newArray[newArray.length - 1] - this.pagesCount : 0;
    const offLeft = newArray[0] < 1 ? 1 - newArray[0] : 0;

    this.navArray = offRight ? newArray.map(x => x - offRight) : offLeft ?  newArray.map(x => x + offLeft) : newArray;
  }

}
