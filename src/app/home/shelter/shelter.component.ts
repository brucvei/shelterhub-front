import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from "@angular/material/dialog";
import {fromEvent, Subject, takeUntil} from "rxjs";
import {ItemShelterProvider} from "../../../providers/item-shelter";
import {TransactionsProvider} from "../../../providers/transactions";
import {MatSnackBar} from '@angular/material/snack-bar';
import {NewItemShelterComponent} from './new-item-shelter/new-item-shelter.component';
import {ItemProvider} from '../../../providers/item';
import {NewTransactionComponent} from './new-transaction/new-transaction.component';
import {AuthService} from "../../auth/auth.service";
import {ShelterProvider} from "../../../providers/shelter";
import moment from "moment";

@Component({
  selector: 'app-shelter',
  templateUrl: './shelter.component.html',
  styleUrls: ['./shelter.component.scss']
})
export class ShelterComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  loading = false;

  shelterId: string;
  shelter = history.state.shelter;

  itens: any[] = [];
  shelterItens: any[] = [];
  transactions: any[] = [];

  str: any = {
    "INPUT": "Entrada",
    "OUTPUT": "Saída",
  }

  constructor(private route: ActivatedRoute,
              private shelterProvider: ShelterProvider,
              private itemProvider: ItemProvider,
              private itemShelterProvider: ItemShelterProvider,
              private transactionProvider: TransactionsProvider,
              readonly snackBar: MatSnackBar,
              private authService: AuthService,
              public dialog: MatDialog,
              public router: Router) {
    this.shelterId = <string>this.route.snapshot.paramMap.get('id');

    if (this.isVolunteer()) {
      this.getShelter();
    }
    this.getItens();
    this.getShelterItens();
    this.getTransactions();
  }

  ngOnInit() {
    fromEvent(window, 'resize')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.isMobileDevice()) {
          console.log('mobile')
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

  getShelter() {
    this.loading = true;
    this.shelterProvider.getById(this.shelterId).subscribe({
      next: resp => {
        this.shelter = resp;
        this.loading = false;
      }
    });
  }

  getItens() {
    this.loading = true;
    this.itemProvider.get().subscribe({
      next: resp => {
        this.itens = resp;
        this.loading = false;
      }
    });
  }

  getShelterItens() {
    this.loading = true;
    this.itemShelterProvider.get(this.shelterId).subscribe({
      next: resp => {
        this.shelterItens = resp;
        console.log('shelterItens', this.shelterItens)
        this.loading = false;
      }
    });
  }

  getTransactions() {
    this.loading = true;
    this.transactionProvider.get(this.shelterId).subscribe({
      next: resp => {
        this.transactions = resp;
        console.log('transactions', this.transactions)
        this.loading = false;
      }
    });
  }

  newItemShelter() {
    const dialogRef = this.dialog.open(NewItemShelterComponent, {
      data: {
        all: this.itens,
        shelterId: this.shelterId,
      },
    });
    dialogRef.afterClosed().subscribe({
      next: result => {
        if (result === 'ok') {
          this.snackBar.open('Item associado ao abrigo com sucesso!', "", {duration: 3000});
          this.getShelterItens();
        }
      }
    });
  }

  newTransaction() {
    const dialogRef = this.dialog.open(NewTransactionComponent, {
      data: {
        all: this.shelterItens,
        shelterId: this.shelterId,
      },
    });
    dialogRef.afterClosed().subscribe({
      next: result => {
        if (result === 'ok') {
          this.snackBar.open('Transação feita com sucesso!', "", {duration: 3000});
          this.getTransactions();
          this.getShelterItens();
        }
      }
    });
  }


  formateDate(str: string) {
    return moment(str).format('DD/MM/YY HH:mm');
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  isFunctionary() {
    return this.authService.isUser();
  }

  isVolunteer() {
    return this.authService.isVolunteer();
  }
}
