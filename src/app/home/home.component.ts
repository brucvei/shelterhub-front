import {Component, OnInit} from '@angular/core';
import {ShelterProvider} from "../../providers/shelter";
import {MatDialog} from "@angular/material/dialog";
import {NewShelterComponent} from "./new-shelter/new-shelter.component";
import {Shelter} from "../../models/Shelter";
import {Router} from "@angular/router";
import {ItemProvider} from "../../providers/item";
import {CategoryProvider} from "../../providers/category";
import {MeasurementUnitProvider} from "../../providers/measurement-unit";
import {NewItemComponent} from "./new-item/new-item.component";
import {of} from "rxjs";
import {NewCategoryUnitComponent} from "./new-category-unit/new-category-unit.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../auth/auth.service";
import {Chart, ChartConfiguration} from "chart.js";
import {TransactionsProvider} from "../../providers/transactions";
import moment from "moment";
import {NewTransactionComponent} from "./shelter/new-transaction/new-transaction.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  loadingShelter = false;
  loadingItens = false;
  loadingCategories = false;
  loadingUnits = false;
  shelters: Shelter[] = [];
  itens: any[] = [];
  categories: any[] = [];
  measurementUnits: any[] = [];
  months = [{nome: 'Jan', numb: 0}, {nome: 'Fev', numb: 1}, {nome: 'Mar', numb: 2}, {
    nome: 'Abr',
    numb: 3
  }, {nome: 'Mai', numb: 4}, {nome: 'Jun', numb: 5}, {nome: 'Jul', numb: 6}, {nome: 'Ago', numb: 7}, {
    nome: 'Set',
    numb: 8
  }, {nome: 'Out', numb: 9}, {nome: 'Nov', numb: 10}, {nome: 'Dez', numb: 11}];
  select: any = this.months[moment().month()];
  withoutTranstactions: boolean = false;

  constructor(private shelterProvider: ShelterProvider,
              private itemProvider: ItemProvider,
              private categoryProvider: CategoryProvider,
              private measurementProvider: MeasurementUnitProvider,
              private transactionProvider: TransactionsProvider,
              private router: Router,
              private authService: AuthService,
              readonly snackBar: MatSnackBar,
              public dialog: MatDialog) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else if (!this.authService.isAdmin() && !this.authService.isUser()) {
      this.snackBar.open('Usuario nao autorizado!', "", {duration: 3000});
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    if (this.isAdmin()) {
      this.getShelters();
      this.getChart();
    } else if (this.isUser()) {
      this.getOneShelter();
    }
    this.getItens();
    this.getCategory();
    this.getMeasurementUnit();
  }

  isMobileDevice(): boolean {
    const userAgent = navigator.userAgent;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  }

  getShelters() {
    this.loadingShelter = true;
    this.shelterProvider.get().subscribe({
      next: resp => {
        console.log('shelter', resp);
        let shelter: Shelter[] = [];
        if (resp) {
          resp.forEach((element: any) => {
            shelter.push(new Shelter(element.id, element.name, element.address, element.items));
          });
        }
        this.shelters = shelter;
        this.loadingShelter = false;
      }, error: (error) => {
        console.error('There was an error during the request', error);
        this.loadingShelter = false;
        this.snackBar.open('Não foi possível buscar os abrigos!', "", {duration: 3000});
        return of([]); // Retorna um Observable vazio para que o fluxo continue
      }
    });
  }

  getOneShelter() {
    this.loadingShelter = true;
    this.shelterProvider.getById('1').subscribe({
      next: resp => {
        console.log('shelter', resp);
        let shelter: Shelter[] = [];
        if (resp) {
          resp.forEach((element: any) => {
            shelter.push(new Shelter(element.id, element.name, element.address, element.items));
          });
        }
        this.shelters = shelter;
        this.loadingShelter = false;
      }, error: (error) => {
        console.error('There was an error during the request', error);
        this.loadingShelter = false;
        this.snackBar.open('Não foi possível buscar os abrigos!', "", {duration: 3000});
        return of([]); // Retorna um Observable vazio para que o fluxo continue
      }
    });
  }

  getChart() {
    // this.withoutTranstactions = false;
    // let obj = {
    //   startDate: moment().month(this.select.numb).startOf('month').format('YYYY-MM-DD'),
    //   endDate: moment().month(this.select.numb).endOf('month').format('YYYY-MM-DD')
    // }
    // this.transactionProvider.getAll(obj).subscribe({
    //   next: resp => {
    //     if (resp) {
    //       this.generateReport(resp);
    //     } else {
    //       this.withoutTranstactions = true;
    //     }
    //   }, error: (error) => {
    //     console.error('There was an error during the request', error);
    //     this.snackBar.open('Não foi possível buscar o gráfico!', "", {duration: 3000});
    //     return of([]); // Retorna um Observable vazio para que o fluxo continue
    //   }
    // });
  }

  getItens() {
    this.loadingItens = true;
    this.itemProvider.get().subscribe({
      next: resp => {
        console.log('itens', resp);
        this.itens = resp;
        this.loadingItens = false;
      }, error: (error) => {
        console.error('There was an error during the request', error);
        this.loadingShelter = false;
        this.snackBar.open('Não foi possível buscar os itens!', "", {duration: 3000});
        return of([]); // Retorna um Observable vazio para que o fluxo continue
      }
    });
  }


  getCategory() {
    this.loadingCategories = true;
    this.categoryProvider.get().subscribe({
      next: resp => {
        console.log('category', resp);
        this.categories = resp;
        this.loadingCategories = false;
      }, error: (error) => {
        console.error('There was an error during the request', error);
        this.loadingShelter = false;
        this.snackBar.open('Não foi possível buscar as categorias!', "", {duration: 3000});
        return of([]); // Retorna um Observable vazio para que o fluxo continue
      }
    });
  }

  getMeasurementUnit() {
    this.loadingUnits = true;
    this.measurementProvider.get().subscribe({
      next: resp => {
        console.log('unit', resp);
        this.measurementUnits = resp;
        this.loadingUnits = false;
      }, error: (error) => {
        console.error('There was an error during the request', error);
        this.loadingShelter = false;
        this.snackBar.open('Não foi possível buscar as unidades de medida!', "", {duration: 3000});
        return of([]); // Retorna um Observable vazio para que o fluxo continue
      }
    });
  }

  enterShelter(shelter: any) {
    this.snackBar.open('Redirecionando...', "", {duration: 3000});
    localStorage.setItem('shelterId', shelter.id.toString());
    this.router.navigate(['/shelter', shelter.id], {state: {shelter: shelter}});
  }

  newShelter() {
    const dialogRef = this.dialog.open(NewShelterComponent);
    dialogRef.afterClosed().subscribe({
      next: result => {
        if (result === 'ok') {
          this.snackBar.open('Abrigo cadastrado com sucesso!', "", {duration: 3000});
          this.getShelters();
        }
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
    dialogRef.afterClosed().subscribe({
      next: result => {
        if (result === 'ok') {
          this.snackBar.open('Item cadastrado com sucesso!', "", {duration: 3000});
          this.getItens();
        }
      }
    });
  }

  newUnit() {
    const dialogRef = this.dialog.open(NewCategoryUnitComponent, {
      data: {
        unit: true,
      },
    });
    dialogRef.afterClosed().subscribe({
      next: result => {
        if (result === 'ok') {
          this.snackBar.open('Unidade de medida cadastrada com sucesso!', "", {duration: 3000});
          this.getMeasurementUnit();
        }
      }
    });
  }

  newCategory() {
    const dialogRef = this.dialog.open(NewCategoryUnitComponent, {
      data: {
        category: true,
      },
    });
    dialogRef.afterClosed().subscribe({
      next: result => {
        if (result === 'ok') {
          this.snackBar.open('Categoria cadastrada com sucesso!', "", {duration: 3000});
          this.getCategory();
        }
      }
    });
  }

  newTransactionShelter() {
    const dialogRef = this.dialog.open(NewTransactionComponent, {
      data: {
        all: this.itens,
        transfer: true,
        shelters: this.shelters
      },
    });
    dialogRef.afterClosed().subscribe({
      next: result => {
        if (result === 'ok') {
          this.snackBar.open('Transação feita com sucesso!', "", {duration: 3000});
        }
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
    dialogRef.afterClosed().subscribe({
      next: result => {
        if (result === 'ok') {
          this.snackBar.open('Abrigo editado com sucesso!', "", {duration: 3000});
          this.getShelters();
        }
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
    dialogRef.afterClosed().subscribe({
      next: result => {
        if (result === 'ok') {
          this.snackBar.open('Item editado com sucesso!', "", {duration: 3000});
          this.getItens();
        }
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
    dialogRef.afterClosed().subscribe({
      next: result => {
        if (result === 'ok') {
          this.snackBar.open('Categoria editada com sucesso!', "", {duration: 3000});
          this.getCategory();
        }
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
    dialogRef.afterClosed().subscribe({
      next: result => {
        if (result === 'ok') {
          this.snackBar.open('Unidade de medida editada com sucesso!', "", {duration: 3000});
          this.getMeasurementUnit();
        }
      }
    });
  }

  deleteShelter(id: string) {
    this.loadingShelter = true;
    this.shelterProvider.delete(id).subscribe({
      next: () => {
        this.snackBar.open('Abrigo removido com sucesso!', "", {duration: 3000});
        this.getShelters();
        this.loadingShelter = false;
      }
    });
  }

  deleteItem(id: string) {
    this.loadingItens = true;
    this.itemProvider.delete(id).subscribe({
      next: () => {
        this.snackBar.open('Item removido com sucesso!', "", {duration: 3000});
        this.getItens();
        this.loadingItens = false;
      }
    });
  }

  deleteCategory(id: string) {
    this.loadingCategories = true;
    this.categoryProvider.delete(id).subscribe({
      next: () => {
        this.snackBar.open('Categoria removida com sucesso!', "", {duration: 3000});
        this.getCategory();
        this.loadingCategories = false;
      }
    });
  }

  deleteUnit(id: string) {
    this.loadingUnits = true;
    this.measurementProvider.delete(id).subscribe({
      next: () => {
        this.snackBar.open('Unidade de medida removida com sucesso!', "", {duration: 3000});
        this.getMeasurementUnit();
        this.loadingUnits = false;
      }
    });
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  isUser() {
    return this.authService.isUser();
  }

  changeMonth(mes: any) {
    this.select = this.months.find((element) => element.numb === mes);
    this.getChart();
  }

  changeMonth2(s: '-' | '+') {
    switch (s) {
      case '+':
        let index = this.months.findIndex((element) => element.numb === this.select.numb);
        if (index === 11) {
          this.select = this.months[0];
        } else {
          this.select = this.months[index + 1];
        }
        break;
      case '-':
        let index2 = this.months.findIndex((element) => element.numb === this.select.numb);
        if (index2 === 0) {
          this.select = this.months[11];
        } else {
          this.select = this.months[index2 - 1];
        }
        break;
    }
    this.getChart();
  }

  private generateReport(resp: any) {
    // @ts-ignore
    // @ts-ignore

    let elem1: HTMLCanvasElement = document.getElementById('chart1');
    if (elem1 == null) return;
    elem1.style.display = 'block';
    document.getElementById('chart2');
    let data = resp;
    let byTransaction: any = {"OUTPUT": 0, "INPUT": 0}, byItem: any = [], labelsItem: any = [];
    data.forEach((transaction: any) => {
      byTransaction[transaction.action] += transaction.quantity;
      let item = transaction.itemShelter.item
      if (labelsItem.indexOf(item.name) === -1) {
        labelsItem.push(item.name);
      }
      let index = labelsItem.indexOf(item.name);
      if (byItem[index] === undefined) {
        byItem[index] = 0;
      }

      if (transaction.action == 'OUTPUT') {
        byItem[index] -= transaction.quantity;
      } else if (transaction.action == 'INPUT') {
        byItem[index] += transaction.quantity;
      }

    });
    console.log('byTransaction', byTransaction);
    console.log('byItem', byItem);
    console.log('labelsItem', labelsItem);
    // let config: ChartConfiguration = {
    //   type: 'bar',
    //   data: {
    //     labels: ["Entrada", "Saída"],
    //     datasets: [{
    //       // labels: ["Entrada", "Saída"],
    //       label: "AAAAAAAAAaa",
    //       data: [byTransaction["OUTPUT"], byTransaction["INPUT"]],
    //     }]
    //   },
    //   options: {
    //     responsive: true,
    //     scales: {
    //       y: {
    //         beginAtZero: true
    //       }
    //     },
    //     plugins: {
    //       legend: {
    //         display: false
    //       },
    //       tooltip: {
    //         enabled: false
    //       }
    //     }
    //   }
    // };
    //
    // let chart = new Chart(elem1, config);

    let config2: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: labelsItem,
        datasets: [{
          //       // labels: ["Entrada", "Saída"],
          //       label: "AAAAAAAAAaa",
          data: byItem,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };

    let chart2 = new Chart(elem1, config2);

  }
}
