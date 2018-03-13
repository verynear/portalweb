import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageReportComponent } from './message-report.component';

describe('MessageReportComponent', () => {
  let component: MessageReportComponent;
  let fixture: ComponentFixture<MessageReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
