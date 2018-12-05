import { async, ComponentFixture, TestBed, flush, fakeAsync, tick } from '@angular/core/testing';

import { TableNavComponent } from './table-nav.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: '<sl-table-nav [pagesCount]="pagesCount" (pageChangeEmitter)="handlePageChange($event)"></sl-table-nav>'
})
class ListViewMockComponent {
  pagesCount = 3;
  handlePageChange(page: number) {}
}

describe('TableNavComponent', () => {
  let listViewMockFixture: ComponentFixture<ListViewMockComponent>;
  let listViewMockComponent: ListViewMockComponent;
  let navDE: DebugElement;
  let navComponent: TableNavComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableNavComponent, ListViewMockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    listViewMockFixture = TestBed.createComponent(ListViewMockComponent);
    listViewMockComponent = listViewMockFixture.componentInstance;
    navDE = listViewMockFixture.debugElement.query(By.directive(TableNavComponent));
    navComponent = navDE.componentInstance;

    listViewMockFixture.detectChanges();
  });

  it('should create', () => {
    expect(navComponent).toBeTruthy();
  });

  it('should initialize properly', () => {
    expect(navComponent.navArray.length).toBe(3);
    expect(navComponent.currentPage).toBe(1);
  });

  it('should react properly to simple changes', () => {
    navComponent.currentPage = 2;

    listViewMockComponent.pagesCount = 4;
    listViewMockFixture.detectChanges();

    expect(navComponent.currentPage).toBe(1);
    expect(navComponent.navArray.length).toBe(4);
  });


  it('should not change current page or generate nav buttons if changes don\'t include change of pages count', () => {
    navComponent.currentPage = 6;
    navComponent.ngOnChanges({});

    listViewMockFixture.detectChanges();
    expect(navComponent.currentPage).not.toBe(1);
  });

  it('should present max 5 buttons besides "previous" and "next" buttons', () => {
    listViewMockComponent.pagesCount = 20;
    listViewMockFixture.detectChanges();

    expect(navComponent.navArray.length).toBe(5);
  });

  it('should have "prev" button disabled when the current page is first page', () => {
    navComponent.currentPage = 1;
    listViewMockFixture.detectChanges();

    const prevButton = navDE.query(By.css('.prev-button')).nativeElement;
    const disabledButton = navDE.query(By.css('.disabled')).nativeElement;

    expect(prevButton).toEqual(disabledButton);
  });

  it('should have only one button that is active, and that should be the current page button', () => {
    navComponent.currentPage = 2;
    listViewMockFixture.detectChanges();

    const activeBtnsDE = navDE.queryAll(By.css('.active'));
    const activeButtonNumber = parseInt(activeBtnsDE[0].nativeElement.innerText, 10); // parseInt cause of screen-readers "current" span

    expect(activeBtnsDE.length).toBe(1);
    expect(activeButtonNumber).toBe(2);
  });

  it('should have "next" button disabled when the current page is last page', () => {
    navComponent.currentPage = navComponent.pagesCount;

    listViewMockFixture.detectChanges();

    const nextButton = navDE.query(By.css('.next-button')).nativeElement;
    const disabledButton = navDE.query(By.css('.disabled')).nativeElement;

    expect(nextButton).toEqual(disabledButton);
  });

  it('should call proper methods for handling "prev" and "next" buttons', () => {
    spyOn(navComponent, 'handlePreviousButton');
    spyOn(navComponent, 'handleNextButton');

    const prevButtonDE = navDE.query(By.css('.prev-button'));
    const nextButtonDE = navDE.query(By.css('.next-button'));

    prevButtonDE.triggerEventHandler('click', null);
    nextButtonDE.triggerEventHandler('click', null);

    expect(navComponent.handlePreviousButton).toHaveBeenCalled();
    expect(navComponent.handleNextButton).toHaveBeenCalled();
  });

  it('should properly call method for handling page change when numbered buttons are clicked', () => {
    spyOn(navComponent, 'handlePageChange');
    const buttonsDE = navDE.queryAll(By.css('.number-button'));

    buttonsDE.forEach((btnDE, idx) => {
      btnDE.triggerEventHandler('click', null);

      const expectedArg = parseInt(btnDE.nativeElement.innerText, 10); // parseInt cause of screen-readers "current" span
      expect(navComponent.handlePageChange['calls'].argsFor(idx)[0]).toBe(expectedArg);
    });

    expect(navComponent.handlePageChange).toHaveBeenCalledTimes(buttonsDE.length);
  });

  describe('handleNextButton method', () => {
    it('should not call a method to handle page change if current page is not lesser than total pages count', () => {
      spyOn(navComponent, 'handlePageChange');

      navComponent.pagesCount = 2;
      navComponent.currentPage = 2;

      navComponent.handleNextButton();

      expect(navComponent.handlePageChange).not.toHaveBeenCalled();
    });

    it('should call a method to handle page change with proper argument', () => {
      spyOn(navComponent, 'handlePageChange');
      navComponent.currentPage = 1;

      navComponent.handleNextButton();

      expect(navComponent.handlePageChange).toHaveBeenCalledWith(2);
    });
  });


  describe('handlePreviousButton method', () => {
    it('should not call a method to handle page change if current page is not greater than 1', () => {
      spyOn(navComponent, 'handlePageChange');

      navComponent.currentPage = 1;

      navComponent.handlePreviousButton();

      expect(navComponent.handlePageChange).not.toHaveBeenCalled();
    });

    it('should call a method to handle page change with proper argument', () => {
      spyOn(navComponent, 'handlePageChange');
      navComponent.currentPage = 2;

      navComponent.handlePreviousButton();

      expect(navComponent.handlePageChange).toHaveBeenCalledWith(1);
    });
  });

  describe('handlePageChange method', () => {

    it('should not couse emitting page if that\s the same as the current page', () => {
      spyOn(navComponent.pageChangeEmitter, 'emit');
      navComponent.currentPage = 3;

      navComponent.handlePageChange(3);

      expect(navComponent.pageChangeEmitter.emit).not.toHaveBeenCalled();
    });

    it('should trigger change of the current page', () => {
      navComponent.currentPage = 3;

      navComponent.handlePageChange(1);

      expect(navComponent.currentPage).toBe(1);
    });

    it('should trigger emission of current page\'s new value', () => {
      navComponent.currentPage = 3;
      spyOn(navComponent.pageChangeEmitter, 'emit');

      navComponent.handlePageChange(1);

      expect(navComponent.pageChangeEmitter.emit).toHaveBeenCalledWith(1);
    });

    it('should trigger generation of new nav buttons array', () => {
      navComponent.pagesCount = 5;
      navComponent.currentPage = 1;
      navComponent.navArray = [1, 2, 3];

      navComponent.handlePageChange(5);

      expect(navComponent.navArray).toEqual([1, 2, 3, 4, 5]);
    });

  });

});
