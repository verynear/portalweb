import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestcardComponent } from './guestcard.component';

describe('GuestcardComponent', () => {
  let component: GuestcardComponent;
  let fixture: ComponentFixture<GuestcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
