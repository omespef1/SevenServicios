import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmplanePage } from './gmplane.page';

describe('GmplanePage', () => {
  let component: GmplanePage;
  let fixture: ComponentFixture<GmplanePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmplanePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmplanePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
