import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CategoryProvider} from "../../../providers/category";
import {MeasurementUnitProvider} from "../../../providers/measurement-unit";

@Component({
  selector: 'app-new-category-unit',
  templateUrl: './new-category-unit.component.html',
  styleUrl: './new-category-unit.component.scss'
})
export class NewCategoryUnitComponent {
  public form: any;
  public loading: boolean = false;
  public sending: boolean = false;
  public erro: boolean = false;
  public category = false;
  public unit = false;

  edit: boolean = false;
  obj: any = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<NewCategoryUnitComponent>,
              private categoryProvider: CategoryProvider,
              private measurementProvider: MeasurementUnitProvider,) {
    this.edit = !!data.obj;
    this.obj = data.obj;
    this.category = !!data.category;
    this.unit = !!data.unit;
    this.loading = true;

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });

    if (this.edit) {
      this.form.get('name').setValue(this.obj.name);
    }

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
      let obj = {
        name: this.form.value.name,
      };
      if (this.category) {
        this.categoryProvider.post(obj).subscribe({
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
      } else if (this.unit) {
        this.measurementProvider.post(obj).subscribe({
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
      }
    } else {
      this.erro = true;
    }
  }
}
