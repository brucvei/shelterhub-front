import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShelterComponent} from "./home/shelter/shelter.component";
import {HomeComponent} from "./home/home.component";
import {authGuard} from "./auth/auth.guard";
import {AdminComponent} from "./pages/admin/admin.component";
import {LoginComponent} from "./pages/login/login.component";
import {SignupComponent} from "./pages/signup/signup.component";

const routes: Routes = [
  // {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'shelter/:id', component: ShelterComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'login/:id', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'admin', component: AdminComponent, canActivate: [authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
