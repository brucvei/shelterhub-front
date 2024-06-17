import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ItemShelterProvider } from '../../../providers/item-shelter';
import { NewItemShelterComponent } from '../new-item-shelter/new-item-shelter.component';
import { TransactionsProvider } from '../../../providers/transactions';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrl: './new-transaction.component.scss'
})
export class NewTransactionComponent {

  all: any[] = [];
  item = false;
  shelterId: any;

  public form: any;
  public loading: boolean = false;
  public sending: boolean = false;
  public erro: boolean = false;

  edit: boolean = false;
  obj: any = null;
  erroMsg: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<NewTransactionComponent>,
              private provider: TransactionsProvider) {
    this.edit = !!data.edit;
    this.obj = data.obj;
    this.all = data.all;
    this.shelterId = data.shelterId;
    
    this.loading = true;
    this.form = new FormGroup({
      item: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      action: new FormControl('', [Validators.required]),
    });

    if (this.edit) {
      this.form.get('item').setValue(this.obj.item);
      this.form.get('quantity').setValue(this.obj.quantity);
      this.form.get('action').setValue(this.obj.action);
    }

    this.loading = false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  post() {
    if (this.form.valid) {
      if (this.form.get('quantity') > this.form.get('item').value.quantity && this.form.get('action').value == "OUTPUT") {
        this.erroMsg = "A quantidade que você quer retirar não está disponível!";
        return;
      }
      if (this.form.get('quantity') < 0) {
        this.erroMsg = "A quantidade não pode ser negativa!";
        return;
      }

      this.sending = true;
      this.loading = true;
      this.erroMsg = "";
      this.erro = false;
      let obj = {
        itemId: this.form.value.item.id,
        quantity: this.form.value.quantity,
        shelterId: this.shelterId,
      };
      this.provider.post(obj).subscribe((resp) => {
        this.dialogRef.close();
        this.sending = false;
        this.loading = false;
      }, error => {
        this.sending = false;
        this.loading = false;
        console.error('There was an error during the request', error);
      });
    } else {
      this.erro = true;
    }
  }

  put() {
    if (this.form.valid) {
      this.sending = true;
      this.loading = true;
      this.erro = false;
      let obj = {
        id: this.obj.id,
        name: this.form.value.name,
        categoryId: this.form.value.category,
        measurementUnitId: this.form.value.unit,
      };
      this.provider.put(obj).subscribe((resp) => {
        this.dialogRef.close();
        this.sending = false;
        this.loading = false;
      }, error => {
        this.sending = false;
        this.loading = false;
        console.error('There was an error during the request', error);
      });
    } else {
      this.erro = true;
    }
  }

}
