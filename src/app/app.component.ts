import { Component } from '@angular/core';
import {ShelterProvider} from "../providers/shelter";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'shelterhub';

  constructor(public router: Router) {
  }
}
