import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteSwitchComponent } from './site-switch.component';

describe('SiteSwitchComponent', () => {
  let component: SiteSwitchComponent;
  let fixture: ComponentFixture<SiteSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
