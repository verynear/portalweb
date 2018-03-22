import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentSentDateListComponent } from './attachment-sent-date-list.component';

describe('AttachmentSentDateListComponent', () => {
  let component: AttachmentSentDateListComponent;
  let fixture: ComponentFixture<AttachmentSentDateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachmentSentDateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentSentDateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
