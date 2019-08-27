import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DteendepPage } from './dteendep.page';

describe('DteendepPage', () => {
  let component: DteendepPage;
  let fixture: ComponentFixture<DteendepPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DteendepPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DteendepPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
