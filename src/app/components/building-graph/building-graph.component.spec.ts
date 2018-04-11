import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingGraphComponent } from './building-graph.component';

describe('BuildingGraphComponent', () => {
  let component: BuildingGraphComponent;
  let fixture: ComponentFixture<BuildingGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
