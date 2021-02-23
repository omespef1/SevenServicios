import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtinfarPage } from './etinfar.page';

describe('EtinfarPage', () => {
  let component: EtinfarPage;
  let fixture: ComponentFixture<EtinfarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtinfarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtinfarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
