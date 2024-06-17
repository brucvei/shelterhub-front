import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCategoryUnitComponent } from './new-category-unit.component';

describe('NewCategoryUnitComponent', () => {
  let component: NewCategoryUnitComponent;
  let fixture: ComponentFixture<NewCategoryUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewCategoryUnitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCategoryUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
