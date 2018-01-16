import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementcomposeComponent } from './announcementcompose.component';

describe('AnnouncementcomposeComponent', () => {
  let component: AnnouncementcomposeComponent;
  let fixture: ComponentFixture<AnnouncementcomposeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnouncementcomposeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementcomposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
