import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuafiliPage } from './suafili.page';

describe('SuafiliPage', () => {
  let component: SuafiliPage;
  let fixture: ComponentFixture<SuafiliPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuafiliPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuafiliPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
