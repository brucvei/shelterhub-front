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
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  loadingShelter = false;
  loadingItens = false;
  loadingCategories = false;
  loadingUnits = false;
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
              readonly snackBar: MatSnackBar,
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

  isMobileDevice(): boolean {
    const userAgent = navigator.userAgent;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  }

  getShelters() {
    this.loadingShelter = true;
    this.shelterProvider.get().subscribe(resp => {
      let shelter: Shelter[] = [];
      if (resp) {
        resp.forEach((element: any) => {
          shelter.push(new Shelter(element.id, element.name, element.address, element.items));
        });
      }
      this.shelters = shelter;
      this.loadingShelter = false;
    });
  }

  getItens() {
    this.loadingItens = true;
    this.itemProvider.get().subscribe(resp => {
      this.itens = resp;
      this.loadingItens = false;
    });
  }


  getCategory() {
    this.loadingCategories = true;
    this.categoryProvider.get().subscribe(resp => {
      this.categories = resp;
      this.loadingCategories = false;
    });
  }

  getMeasurementUnit() {
    this.loadingUnits = true;
    this.measurementProvider.get().subscribe(resp => {
      this.measurementUnits = resp;
      this.loadingUnits = false;
    });
  }

  enterShelter(shelter: any) {
    let snackBarRef = this.snackBar.open('Redirecionando...',  "",{duration: 3000});
    localStorage.setItem('shelterId', shelter.id.toString());
    this.router.navigate(['/shelter', shelter.id], {state: {shelter: shelter}});
  }

  newShelter() {
    const dialogRef = this.dialog.open(NewShelterComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'ok'){
        let snackBarRef = this.snackBar.open('Abrigo cadastrado com sucesso!',  "",{duration: 3000});
        this.getShelters();
      }
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
      if (result === 'ok'){
        let snackBarRef = this.snackBar.open('Item cadastrado com sucesso!',  "",{duration: 3000});
        this.getItens();
      }
    });
  }

  newUnit() {
    const dialogRef = this.dialog.open(NewCategoryUnitComponent, {
      data: {
        unit: true,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'ok') {
        let snackBarRef = this.snackBar.open('Unidade de medida cadastrada com sucesso!', "", {duration: 3000});
        this.getMeasurementUnit();
      }
    });
  }

  newCategory() {
    const dialogRef = this.dialog.open(NewCategoryUnitComponent, {
      data: {
        category: true,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'ok'){
        let snackBarRef = this.snackBar.open('Categoria cadastrada com sucesso!',  "",{duration: 3000});
        this.getShelters();
      }
    });
  }

  editShelter(shelter: Shelter) {
    const dialogRef = this.dialog.open(NewShelterComponent, {
      data: {
        edit: true,
        obj: shelter
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'ok'){
        let snackBarRef = this.snackBar.open('Abrigo editado com sucesso!',  "",{duration: 3000});
        this.getShelters();
      }
    });
  }

  editItem(row: any) {
    const dialogRef = this.dialog.open(NewItemComponent, {
      data: {
        categories: this.categories,
        measurementUnits: this.measurementUnits,
        edit: true,
        obj: row
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'ok'){
        let snackBarRef = this.snackBar.open('Item editado com sucesso!',  "",{duration: 3000});
        this.getItens();
      }
    });
  }


  editCategory(row: any) {
    const dialogRef = this.dialog.open(NewCategoryUnitComponent, {
      data: {
        category: true,
        edit: true,
        obj: row
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'ok'){
        let snackBarRef = this.snackBar.open('Categoria editada com sucesso!',  "",{duration: 3000});
        this.getShelters();
      }
    });
  }

  editUnit(row: any) {
    const dialogRef = this.dialog.open(NewCategoryUnitComponent, {
      data: {
        unit: true,
        edit: true,
        obj: row
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'ok'){
        let snackBarRef = this.snackBar.open('Unidade de medida editada com sucesso!',  "",{duration: 3000});
        this.getShelters();
      }
    });
  }

  deleteShelter(id: string) {
    this.loadingShelter = true;
    this.shelterProvider.delete(id).subscribe(resp => {
      let snackBarRef = this.snackBar.open('Abrigo removido com sucesso!',  "",{duration: 3000});
      this.getShelters();
      this.loadingShelter = false;
    });
  }

  deleteItem(id: string) {
    this.loadingItens = true;
    this.itemProvider.delete(id).subscribe(resp => {
      let snackBarRef = this.snackBar.open('Item removido com sucesso!',  "",{duration: 3000});
      this.getItens();
      this.loadingItens = false;
    });
  }

  deleteCategory(id: string) {
    this.loadingCategories = true;
    this.categoryProvider.delete(id).subscribe(resp => {
      let snackBarRef = this.snackBar.open('Categoria removida com sucesso!',  "",{duration: 3000});
      this.getCategory();
      this.loadingCategories = false;
    });
  }

  deleteUnit(id: string) {
    this.loadingUnits = true;
    this.measurementProvider.delete(id).subscribe(resp => {
      let snackBarRef = this.snackBar.open('Unidade de medida removida com sucesso!',  "",{duration: 3000});
      this.getMeasurementUnit();
      this.loadingUnits = false;
    });
  }
}
