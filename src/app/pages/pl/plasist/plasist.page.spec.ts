import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlasistPage } from './plasist.page';

describe('PlasistPage', () => {
  let component: PlasistPage;
  let fixture: ComponentFixture<PlasistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlasistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlasistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
