import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveformComponent } from './approveform.component';

describe('ApproveformComponent', () => {
  let component: ApproveformComponent;
  let fixture: ComponentFixture<ApproveformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
