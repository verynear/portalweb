import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReceivedComponent } from './viewreceived.component';

describe('ViewReceivedComponent', () => {
  let component: ViewReceivedComponent;
  let fixture: ComponentFixture<ViewReceivedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewReceivedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
