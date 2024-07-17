import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NewShelterComponent } from './home/new-shelter/new-shelter.component';
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatDialogActions, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatInput} from "@angular/material/input";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import { ShelterComponent } from './home/shelter/shelter.component';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import { NewItemComponent } from './home/new-item/new-item.component';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription, MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatOption, MatSelect} from "@angular/material/select";
import { NewCategoryUnitComponent } from './home/new-category-unit/new-category-unit.component';
import { NewItemShelterComponent } from './home/shelter/new-item-shelter/new-item-shelter.component';
import { NewTransactionComponent } from './home/shelter/new-transaction/new-transaction.component';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { SignupComponent } from './pages/signup/signup.component';
import {ToolbarModule} from "primeng/toolbar";
import {Button} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {TableModule} from "primeng/table";
import {NgxMaskDirective, provideEnvironmentNgxMask} from "ngx-mask";
import {JwtInterceptor} from "../interceptor/jwt";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";

export function HttpLoaderFactory(http: HttpClient)  {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewShelterComponent,
    ShelterComponent,
    NewItemComponent,
    NewCategoryUnitComponent,
    NewItemShelterComponent,
    NewTransactionComponent,
    LoginComponent,
    AdminComponent,
    SignupComponent
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
    MatInput,
    MatGridList,
    MatGridTile,
    MatCard,
    MatCardHeader,
    MatCardActions,
    MatCardContent,
    MatCardTitle,
    MatCardSubtitle,
    MatTabGroup,
    MatTab,
    MatProgressSpinner,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatAccordion,
    MatSelect,
    MatOption,
    MatMiniFabButton,
    MatSort,
    MatPaginator,
    ToolbarModule,
    Button,
    InputTextModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    TableModule,
    NgxMaskDirective,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
  ],
  providers: [
    provideEnvironmentNgxMask(),
    TranslateService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
