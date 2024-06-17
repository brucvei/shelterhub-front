import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShelterProvider} from "../../providers/shelter";
import {MatDialog} from "@angular/material/dialog";
import {NewShelterComponent} from "./new-shelter/new-shelter.component";
import {Shelter} from "../../models/Shelter";
import {Router} from "@angular/router";
import {ItemProvider} from "../../providers/item";
import {CategoryProvider} from "../../providers/category";
import {MeasurementUnitProvider} from "../../providers/measurement-unit";
import {NewItemComponent} from "./new-item/new-item.component";
import {fromEvent, Subject, takeUntil} from "rxjs";
import {NewCategoryUnitComponent} from "./new-category-unit/new-category-unit.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  loading = false;
  shelters: Shelter[] = [];
  itens: any[] = [];
  categories: any[] = [];
  measurementUnits: any[] = [];

  columns = ['name', 'category', 'unit', 'actions'];
  columns2 = ['name', 'actions'];

  displayColumns = this.columns;
  displayColumns2 = this.columns2;

  constructor(private shelterProvider: ShelterProvider,
              private itemProvider: ItemProvider,
              private categoryProvider: CategoryProvider,
              private measurementProvider: MeasurementUnitProvider,
              private router: Router,
              public dialog: MatDialog) {
    this.getShelters();
    this.getItens();
    this.getCategory();
    this.getMeasurementUnit();
    if (this.isMobileDevice()) {
      this.displayColumns = ['mobile'];
      this.displayColumns2 = ['mobile'];
    } else {
      this.displayColumns = this.columns;
      this.displayColumns2 = this.columns2;
    }
  }

  ngOnInit() {
    fromEvent(window, 'resize')
      .pipe(takeUntil(this.destroy$))
      .subscribe(e => {
        if (this.isMobileDevice()) {
          this.displayColumns = ['mobile'];
          this.displayColumns2 = ['mobile'];
        } else {
          this.displayColumns = this.columns;
          this.displayColumns2 = this.columns2;
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getShelters() {
    this.loading = true;
    this.shelterProvider.get().subscribe(resp => {
      let shelter: Shelter[] = [];
      if (resp) {
        resp.forEach((element: any) => {
          shelter.push(new Shelter(element.id, element.name, element.address, element.items));
        });
      }
      this.shelters = shelter;
      this.loading = false;
    });
  }

  getItens() {
    this.loading = true;
    this.itemProvider.get().subscribe(resp => {
      this.itens = resp;
      this.loading = false;
    });
  }


  getCategory() {
    this.loading = true;
    this.categoryProvider.get().subscribe(resp => {
      this.categories = resp;
      this.loading = false;
    });
  }

  getMeasurementUnit() {
    this.loading = true;
    this.measurementProvider.get().subscribe(resp => {
      this.measurementUnits = resp;
      this.loading = false;
    });
  }

  enterShelter(shelter: any) {
    localStorage.setItem('shelterId', shelter.id.toString());
    this.router.navigate(['/shelter', shelter.id], {state: {shelter: shelter}});
  }

  newShelter() {
    const dialogRef = this.dialog.open(NewShelterComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.getShelters();
    });
  }

  newItem() {
    const dialogRef = this.dialog.open(NewItemComponent, {
      data: {
        categories: this.categories,
        measurementUnits: this.measurementUnits
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getItens();
    });
  }

  isMobileDevice(): boolean {
    const userAgent = navigator.userAgent;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  }

  newUnit() {
    const dialogRef = this.dialog.open(NewCategoryUnitComponent, {
      data: {
        unit: true,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getShelters();
    });
  }

  newCategory() {
    const dialogRef = this.dialog.open(NewCategoryUnitComponent, {
      data: {
        category: true,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getShelters();
    });
  }
}
