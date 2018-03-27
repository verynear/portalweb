import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentFormarrayComponent } from './resident-formarray.component';

describe('ResidentFormarrayComponent', () => {
  let component: ResidentFormarrayComponent;
  let fixture: ComponentFixture<ResidentFormarrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidentFormarrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentFormarrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
