import {Component} from '@angular/core';
import {MatDialogRef,} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ShelterProvider} from "../../../providers/shelter";
import {Shelter} from "../../../models/Shelter";

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

  constructor(public dialogRef: MatDialogRef<NewShelterComponent>,
              public provider: ShelterProvider) {
    this.loading = true;
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      district: new FormControl('', [Validators.required]),
      complement: new FormControl(''),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      zipcode: new FormControl('', [Validators.required])
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
      this.provider.post(obj).subscribe((resp: Shelter) => {
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
