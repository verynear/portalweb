import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentDateListComponent } from './attachment-date-list.component';

describe('AttachmentDateListComponent', () => {
  let component: AttachmentDateListComponent;
  let fixture: ComponentFixture<AttachmentDateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachmentDateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentDateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
