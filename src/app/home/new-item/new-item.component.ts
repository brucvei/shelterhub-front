import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ShelterProvider} from "../../../providers/shelter";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Shelter} from "../../../models/Shelter";
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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<NewItemComponent>,
              public provider: ItemProvider) {
    this.categories = data.categories;
    this.measurementUnits = data.measurementUnits;

    this.loading = true;
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      unit: new FormControl('', [Validators.required])
    });
    this.loading = false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick() {
    if (this.form.valid) {
      this.sending = true;
      this.loading = true;
      this.erro = false;
      console.log(this.form.value);
      let obj = {
        name: this.form.value.name,
        categoryId: this.form.value.category,
        measurementUnitId: this.form.value.unit,
      };
      this.provider.post(obj).subscribe((resp) => {
        console.log(resp)
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
