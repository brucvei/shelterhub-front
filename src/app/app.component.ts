import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PrimeNGConfig} from "primeng/api";
import { TranslateService } from '@ngx-translate/core';
import {AuthService} from "./auth/auth.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'shelterhub';

  constructor(public router: Router,
              private auth: AuthService,
              private translateService: TranslateService,
              private primengConfig: PrimeNGConfig) {
  }

  ngOnInit() {
    this.translateService.setDefaultLang('pt-br');
  }

  translate(lang: string) {
    this.translateService.use(lang);
    this.translateService.get('primeng').subscribe(res => this.primengConfig.setTranslation(res));
  }

  logout() {
    this.auth.logout();
  }

  isLogged(){
    return this.auth.isLoggedIn();
  }
}
