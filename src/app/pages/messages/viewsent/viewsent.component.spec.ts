import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSentComponent } from './viewsent.component';

describe('ViewSentComponent', () => {
  let component: ViewSentComponent;
  let fixture: ComponentFixture<ViewSentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
