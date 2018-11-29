import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sl-table-nav',
  templateUrl: './table-nav.component.html',
  styleUrls: ['./table-nav.component.scss']
})
export class TableNavComponent implements OnInit {

  @Input() public pagesCount: number;
  public currentPage = 1;
  public navArray: number[];
  private readonly navArrayLength = 6;


  constructor() { }

  ngOnInit() {
    this.generateNavArray();
  }

  public handleNextButton(): void {
    if (this.currentPage < this.pagesCount) { this.handleCurrentPageInc(); }
  }

  public handlePreviousButton(): void {
    if (this.currentPage > 1) { this.handleCurrentPageDec(); }
  }

  private handleCurrentPageInc(): void {
    this.currentPage++;
    // this.generateNavArray();
    this.generateNavArray2();
  }

  private handleCurrentPageDec(): void {
    this.currentPage--;
    // this.generateNavArray();
    this.generateNavArray2();
  }

  private generateNavArray(): void {

    const arr = [];

    if (this.currentPage > Math.ceil(this.navArrayLength / 2)) {

      const distFromArrCenter = Math.floor(this.navArrayLength / 2);
      const arrIsOdd = this.navArrayLength % 2 === 1;

        if (arrIsOdd) {arr.push(this.currentPage); }

        for (
          let i = arrIsOdd ? 1 : 0;
          arrIsOdd ? i <= distFromArrCenter : i < distFromArrCenter;
          i++) {

            const itemRight = this.currentPage + i;

            if (itemRight <= this.pagesCount) {
              arr.push(itemRight);
            } else {
              arr.push(itemRight - this.navArrayLength);
            }

            const itemLeft = arrIsOdd ? this.currentPage - i : this.currentPage - i - 1;
            arr.push(itemLeft);
        }

        arr.sort((x, y) => x - y);

    } else {
      for (let i = 1; i <= this.navArrayLength; i++) {
        arr.push(i);
      }
    }

    this.navArray = arr;
  }


  private generateNavArray2() {
    const baseArray = [];

    for (let i = 1; i <= this.pagesCount; i++) {
      baseArray.push(i);
    }

    const distFromArrCenter = Math.floor(this.navArrayLength / 2);
    const currentPageIdx = this.currentPage - 1;
    const newArray = baseArray.slice(currentPageIdx - distFromArrCenter, currentPageIdx + distFromArrCenter + 1);
    console.log(newArray);
    this.navArray = newArray;
  }
}
