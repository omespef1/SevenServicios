import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlcaculPage } from './plcacul.page';

describe('PlcaculPage', () => {
  let component: PlcaculPage;
  let fixture: ComponentFixture<PlcaculPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlcaculPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlcaculPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
