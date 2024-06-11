import {Component, OnInit} from '@angular/core';
import {MatDialogRef,} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-new-shelter',
  templateUrl: './new-shelter.component.html',
  styleUrl: './new-shelter.component.css'
})
export class NewShelterComponent implements OnInit {

  public form: any;
  public loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<NewShelterComponent>
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      district: new FormControl('', [Validators.required]),
      complement:  new FormControl(''),
      city:  new FormControl('', [Validators.required]),
      state:  new FormControl('', [Validators.required]),
      zipcode:  new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.loading = true;

    // throw new Error('Method not implemented.');
    this.loading = false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick() {

  }
}
