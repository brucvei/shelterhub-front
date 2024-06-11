import {Component, OnInit} from '@angular/core';
import {ShelterProvider} from "../../providers/shelter";
import {MatDialog} from "@angular/material/dialog";
import {NewShelterComponent} from "./new-shelter/new-shelter.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  constructor(private shelterProvider: ShelterProvider,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    let data = this.shelterProvider.get();
    console.log(data)
    // throw new Error('Method not implemented.');
  }

  newShelter() {
    const dialogRef = this.dialog.open(NewShelterComponent, {
      // width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // You can get the data returned from the modal here
    });
  }
}
