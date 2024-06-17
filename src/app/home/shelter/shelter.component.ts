import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {fromEvent, Subject, takeUntil} from "rxjs";
import {ItemShelterProvider} from "../../../providers/item-shelter";
import {TransactionsProvider} from "../../../providers/transactions";

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
  transactions: any[] = [];

  columns = ['name', 'category', 'unit', 'quantity'];
  columns2 = ['name', 'actions'];

  displayColumns = this.columns;
  displayColumns2 = this.columns2;

  constructor(private route: ActivatedRoute,
              private itemProvider: ItemShelterProvider,
              private transactionProvider: TransactionsProvider,
              public router: Router) {
    if (!this.shelter) {
      this.router.navigate(['/home']);
    }
    this.shelterId = <string>this.route.snapshot.paramMap.get('id');
    if (this.isMobileDevice()) {
      this.displayColumns = ['mobile'];
      this.displayColumns2 = ['mobile'];
    } else {
      this.displayColumns = this.columns;
      this.displayColumns2 = this.columns2;
    }

    this.getItens();
    this.getTransactions();
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

  getItens() {
    this.loading = true;
    this.itemProvider.get().subscribe(resp => {
      console.log(resp);
      this.itens = resp;
      this.loading = false;
    });
  }

  getTransactions() {
    this.loading = true;
    this.transactionProvider.get().subscribe(resp => {
      console.log(resp);
      this.transactions = resp;
      this.loading = false;
    });
  }

  newItemShelter() {

  }

  newTransaction() {

  }
}
