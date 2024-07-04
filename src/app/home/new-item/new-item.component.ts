import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ItemProvider} from "../../../providers/item";

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrl: './new-item.component.scss'
})
export class NewItemComponent {

  categories: any[] = [];
  measurementUnits: any[] = [];
  public form: any;
  public loading: boolean = false;
  public sending: boolean = false;
  public erro: boolean = false;

  edit: boolean = false;
  obj: any = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<NewItemComponent>,
              public provider: ItemProvider) {
    this.edit = !!data.edit;
    this.obj = data.obj;
    this.categories = data.categories;
    this.measurementUnits = data.measurementUnits;

    this.loading = true;
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      unit: new FormControl('', [Validators.required])
    });

    if (this.edit) {
      this.form.get('name').setValue(this.obj.name);
      this.form.get('category').setValue(this.obj.category.id);
      this.form.get('unit').setValue(this.obj.measurementUnit.id);
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
        name: this.form.get('name').value,
        categoryId: this.form.get('category').value,
        measurementUnitId: this.form.get('unit').value,
      };
      this.provider.post(obj).subscribe({
        next: () => {
          this.dialogRef.close('ok');
          this.sending = false;
          this.loading = false;
        }, error: (error) => {
          this.sending = false;
          this.loading = false;
          console.error('There was an error during the request', error);
        }
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
      this.provider.put(obj).subscribe({
        next: () => {
          this.dialogRef.close('ok');
          this.sending = false;
          this.loading = false;
        }, error: (error) => {
          this.sending = false;
          this.loading = false;
          console.error('There was an error during the request', error);
        }
      });
    } else {
      this.erro = true;
    }
  }
}
