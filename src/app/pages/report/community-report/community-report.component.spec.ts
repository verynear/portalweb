import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityReportComponent } from './community-report.component';

describe('CommunityReportComponent', () => {
  let component: CommunityReportComponent;
  let fixture: ComponentFixture<CommunityReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
