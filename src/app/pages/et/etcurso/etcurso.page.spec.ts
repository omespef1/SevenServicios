import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtcursoPage } from './etcurso.page';

describe('EtcursoPage', () => {
  let component: EtcursoPage;
  let fixture: ComponentFixture<EtcursoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtcursoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtcursoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
