import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NewShelterComponent } from './home/new-shelter/new-shelter.component';
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton} from "@angular/material/button";
import {MatDialogActions, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatInput} from "@angular/material/input";
import {HttpClientModule} from "@angular/common/http";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewShelterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatToolbar,
    MatButton,
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatProgressBar,
    MatDialogActions,
    MatInput
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
