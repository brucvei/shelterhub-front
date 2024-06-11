import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewShelterComponent } from './new-shelter.component';

describe('NewShelterComponent', () => {
  let component: NewShelterComponent;
  let fixture: ComponentFixture<NewShelterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewShelterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewShelterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
