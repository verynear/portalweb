import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentFormcontrolComponent } from './resident-formcontrol.component';

describe('ResidentFormcontrolComponent', () => {
  let component: ResidentFormcontrolComponent;
  let fixture: ComponentFixture<ResidentFormcontrolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidentFormcontrolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentFormcontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
