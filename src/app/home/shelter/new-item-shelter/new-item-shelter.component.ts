import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ItemShelterProvider } from '../../../../providers/item-shelter';
import { TransactionsProvider } from '../../../../providers/transactions';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-item-shelter',
  templateUrl: './new-item-shelter.component.html',
  styleUrl: './new-item-shelter.component.scss'
})
export class NewItemShelterComponent {

  all: any[] = [];
  item = false;
  shelterId: any;

  public form: any;
  public loading: boolean = false;
  public sending: boolean = false;
  public erro: boolean = false;

  edit: boolean = false;
  obj: any = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<NewItemShelterComponent>,
              private provider: ItemShelterProvider) {
    this.edit = !!data.edit;
    this.obj = data.obj;
    this.all = data.all;
    this.shelterId = data.shelterId;

    this.loading = true;
    this.form = new FormGroup({
      item: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    });

    if (this.edit) {
      this.form.get('item').setValue(this.obj.name);
      this.form.get('quantity').setValue(this.obj.quantity);
    }

    this.loading = false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  post() {
    if (this.form.valid) {
      this.sending = true;
      this.loading = true;
      this.erro = false;
      let obj = {
        itemId: this.form.value.item,
        quantity: this.form.value.quantity,
        shelterId: this.shelterId,
      };
      this.provider.post(obj).subscribe((resp) => {
        this.dialogRef.close('ok');
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
        this.dialogRef.close('ok');
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
