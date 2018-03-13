import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingReportComponent } from './building-report.component';

describe('BuildingReportComponent', () => {
  let component: BuildingReportComponent;
  let fixture: ComponentFixture<BuildingReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
