import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidDomainComponent } from './invalid-domain.component';

describe('InvalidDomainComponent', () => {
  let component: InvalidDomainComponent;
  let fixture: ComponentFixture<InvalidDomainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvalidDomainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
