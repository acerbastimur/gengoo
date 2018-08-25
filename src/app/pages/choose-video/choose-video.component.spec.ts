import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseVideoComponent } from './choose-video.component';

describe('ChooseVideoComponent', () => {
  let component: ChooseVideoComponent;
  let fixture: ComponentFixture<ChooseVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
