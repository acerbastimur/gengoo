import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnteranceComponent } from './enterance.component';

describe('EnteranceComponent', () => {
  let component: EnteranceComponent;
  let fixture: ComponentFixture<EnteranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnteranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnteranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
