import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Directive, Input, HostListener } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { By } from '@angular/platform-browser';

import { of } from 'rxjs';

import { SharedModule } from '../../shared/shared.module';
import { CharactersData } from '../../shared/models/charactersData.model';
import { FilterComponent } from '../../shared/components/filter/filter.component';
import { CharService } from '../../core/services/char.service';
import { TableNavComponent } from 'src/app/shared/components/table-nav/table-nav.component';
import { ListViewComponent } from './list-view.component';
import { CharactersTableComponent } from '../characters-table/characters-table.component';
import { CharacterFormComponent } from '../character-form/character-form.component';



@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[routerLink]',
})
export class RouterLinkStubDirective {
  @Input() routerLink;
  navigatedTo: string;

  @HostListener('click') onClick() {
   this.navigatedTo = this.routerLink;
  }
}

fdescribe('ListViewComponent', () => {
  let component: ListViewComponent;
  let fixture: ComponentFixture<ListViewComponent>;
  let mockCharService;
  let mockCharactersData: CharactersData;

  beforeEach(() => {

    mockCharService = jasmine.createSpyObj(['getCharactersData']);

    mockCharactersData = {
      characters: [{
        id: '5',
        name: 'Leia Organa',
        species: 'Human',
        gender: 'female',
        homeworld: 'Alderaan'
      },
      {
        id: '6',
        name: 'Obi-Wan Kenobi',
        species: 'Human',
        gender: 'male',
        homeworld: 'Stewjon'
      }],
      pagesCount: 1
    };

    TestBed.configureTestingModule({
      declarations: [ ListViewComponent, CharactersTableComponent, CharacterFormComponent, RouterLinkStubDirective ],
      imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule],
      providers: [{provide: CharService, useValue: mockCharService}, { provide: APP_BASE_HREF, useValue : '/' }]
    });

    fixture = TestBed.createComponent(ListViewComponent);
    component = fixture.componentInstance;

    mockCharService.getCharactersData.and.returnValue(of(mockCharactersData));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display filter component', () => {
    const filterDE = fixture.debugElement.query(By.directive(FilterComponent));
    expect(filterDE).not.toBeNull();
  });

  it('should have correct path in "Add new" link that navigates to form component' , () => {
    const linkDE = fixture.debugElement.query(By.css('.form-link'));

    const routerLinkStub: RouterLinkStubDirective = fixture.debugElement.query(
      By.directive(RouterLinkStubDirective)).injector.get(RouterLinkStubDirective
    );

    linkDE.triggerEventHandler('click', null);

    expect(routerLinkStub.navigatedTo).toBe('/addcharacter');
  });

  it('should display table component', () => {
    const tableDE = fixture.debugElement.query(By.directive(CharactersTableComponent));
    expect(tableDE).not.toBeNull();
  });

  it('should pass characters to table component', () => {
    const table = fixture.debugElement.query(By.directive(CharactersTableComponent)).componentInstance;
    expect(table.characters).toEqual(mockCharactersData.characters);
  });

  it('should display table-nav component if there is truthy pagesCount', () => {
    const tableNavDE = fixture.debugElement.query(By.directive(TableNavComponent));
    expect(tableNavDE).not.toBeNull();
  });

  it('should not display table-nav component if there is falsy pagesCount', () => {
    component.pagesCount = 0;
    fixture.detectChanges();
    const tableNavDE = fixture.debugElement.query(By.directive(TableNavComponent));
    expect(tableNavDE).toBeNull();
  });

  it('should pass pagesCount property to table-nav component', () => {
    const tableNav = fixture.debugElement.query(By.directive(TableNavComponent)).componentInstance;
    tableNav.pagesCount = 1;

    component.pagesCount = 5;
    fixture.detectChanges();

    expect(tableNav.pagesCount).toBe(5);
  });

  describe('handlePageChange method', () => {

    it('should trigger calling service\'s getCharactersData with proper arguments', () => {
      component['filteringTerm'] = 'test-term';

      component.handlePageChange(6);

      expect(mockCharService.getCharactersData).toHaveBeenCalledWith('test-term', 6);
    });

  });

  describe('handleFiltering method', () => {

    it('should store filter value to some property', () => {
      component.handleFiltering('new-filter-value');

      expect(component['filteringTerm']).toBe('new-filter-value');
    });

    it('should trigger calling service\'s getCharactersData with proper arguments', () => {
      component.handleFiltering('handleFiltering test');

      expect(mockCharService.getCharactersData).toHaveBeenCalledWith('handleFiltering test', undefined);
    });

  });

});
