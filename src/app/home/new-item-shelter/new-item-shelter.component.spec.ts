import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewItemShelterComponent } from './new-item-shelter.component';

describe('ItemTransactionComponent', () => {
  let component: NewItemShelterComponent;
  let fixture: ComponentFixture<NewItemShelterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewItemShelterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewItemShelterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
