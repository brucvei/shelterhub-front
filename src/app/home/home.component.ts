import {Component, Input} from '@angular/core';
import {ShelterProvider} from "../../providers/shelter";
import {MatDialog} from "@angular/material/dialog";
import {NewShelterComponent} from "./new-shelter/new-shelter.component";
import {Shelter} from "../../models/Shelter";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @Input() data: Shelter[] = [];
  public loading = false;

  constructor(private shelterProvider: ShelterProvider,
              private router: Router,
              public dialog: MatDialog) {
    this.getShelters();
  }

  newShelter() {
    const dialogRef = this.dialog.open(NewShelterComponent, {
      // width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getShelters();
      // You can get the data returned from the modal here
    });
  }

  getShelters() {
    this.loading = true;
    this.shelterProvider.get().subscribe(resp => {
      let shelter: Shelter[] = [];
      if (resp) {
        resp.forEach((element: any) => {
          shelter.push(new Shelter(element.id, element.name, element.address, element.items));
        });
      }
      this.data = shelter;
      this.loading = false;
      console.log(this.data);
    });
  }

  enterShelter(shelter: any) {
    localStorage.setItem('shelterId', shelter.id.toString());
    this.router.navigate(['/shelter', shelter.id], {state: {shelter: shelter}});
  }
}
