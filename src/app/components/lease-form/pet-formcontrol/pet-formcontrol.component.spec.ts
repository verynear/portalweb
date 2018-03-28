import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetFormcontrolComponent } from './pet-formcontrol.component';

describe('PetFormcontrolComponent', () => {
  let component: PetFormcontrolComponent;
  let fixture: ComponentFixture<PetFormcontrolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetFormcontrolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetFormcontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
