import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentReportComponent } from './resident-report.component';

describe('ResidentReportComponent', () => {
  let component: ResidentReportComponent;
  let fixture: ComponentFixture<ResidentReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidentReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
