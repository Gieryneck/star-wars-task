import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterFormComponent } from './character-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  template: '<a routerLink="/addcharacter"></a>'
})
class ListViewMockComponent {}

describe('CharacterFormComponent', () => {
  let component: ListViewMockComponent;
  let fixture: ComponentFixture<ListViewMockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListViewMockComponent, CharacterFormComponent ],
      imports: [FormsModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListViewMockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
