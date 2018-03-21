import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SrNotesComponent } from './sr-notes.component';

describe('SrNotesComponent', () => {
  let component: SrNotesComponent;
  let fixture: ComponentFixture<SrNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SrNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
