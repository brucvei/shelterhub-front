import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef,} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ShelterProvider} from "../../../providers/shelter";
import {Shelter} from "../../../models/Shelter";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-shelter',
  templateUrl: './new-shelter.component.html',
  styleUrl: './new-shelter.component.scss'
})
export class NewShelterComponent {

  public form: any;
  public loading: boolean = false;
  public sending: boolean = false;
  public erro: boolean = false;

  edit: boolean = false;
  obj: any = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public router: Router,
              public dialogRef: MatDialogRef<NewShelterComponent>,
              public provider: ShelterProvider) {
    if (data) {
      this.edit = true;
      this.obj = data.obj;
    }
    this.loading = true;
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      complement: new FormControl(''),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      zipcode: new FormControl('', [Validators.required])
    });

    if (this.edit) {
      this.form.get('name').setValue(this.obj.name);
      this.form.get('street').setValue(this.obj.address.street);
      this.form.get('number').setValue(this.obj.address.number);
      this.form.get('district').setValue(this.obj.address.district);
      this.form.get('complement').setValue(this.obj.address.complement);
      this.form.get('city').setValue(this.obj.address.city);
      this.form.get('state').setValue(this.obj.address.state);
      this.form.get('zipcode').setValue(this.obj.address.zipCode);
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
        name: this.form.value.name,
        address: {
          street: this.form.value.street,
          number: this.form.value.number,
          district: this.form.value.district,
          complement: this.form.value.complement,
          city: this.form.value.city,
          state: this.form.value.state,
          zipCode: this.form.value.zipcode
        }
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
        address: {
          street: this.form.value.street,
          number: this.form.value.number,
          district: this.form.value.district,
          complement: this.form.value.complement,
          city: this.form.value.city,
          state: this.form.value.state,
          zipCode: this.form.value.zipcode
        }
      };
      this.provider.put(obj).subscribe(() => {
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
