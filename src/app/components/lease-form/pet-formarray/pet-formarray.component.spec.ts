import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetFormarrayComponent } from './pet-formarray.component';

describe('PetFormarrayComponent', () => {
  let component: PetFormarrayComponent;
  let fixture: ComponentFixture<PetFormarrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetFormarrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetFormarrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
