import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShelterComponent} from "./home/shelter/shelter.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'shelter/:id', component: ShelterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
