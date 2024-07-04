import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CPFUtil} from "../../../models/utils/cpf";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  authService = inject(AuthService);
  router = inject(Router);
  cpfUtil = inject(CPFUtil);
  url = inject(ActivatedRoute);

  protected loginForm = new FormGroup({
    cpf: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required])
  });

  sending: boolean = false;
  volunteer: boolean = false;

  ngOnInit(): void {
    if (this.url.snapshot.paramMap.get('id')) {
      this.volunteer = true;
      this.loginForm.get('password')?.removeValidators(Validators.required);
    }
  }

  submit() {
    // @ts-ignore
    if (!this.volunteer && this.loginForm.valid && this.cpfUtil.validateCPF(this.loginForm.value.cpf)) {
      let obj = {
        cpf: this.loginForm.value.cpf,
        password: this.loginForm.value.password
      }
      this.authService.login(obj).subscribe(() => {
        if (this.authService.isAdmin()) {
          this.router.navigate(['/admin']);
        } else if (this.authService.isUser()) {
          this.router.navigate(['/']);
        } else if (this.authService.isVolunteer()) {
          this.router.navigate(['/']);
        }
      });
    } else { // @ts-ignore
      if (this.volunteer && this.loginForm.valid && this.cpfUtil.validateCPF(this.loginForm.value.cpf)) {
        console.log(this.loginForm.value);
        let obj = {
          cpf: this.loginForm.value.cpf,
          name: this.loginForm.value.name,
          shelterId: this.url.snapshot.paramMap.get('id')
        }
        this.authService.loginVolunteer(obj).subscribe(() => {
          this.router.navigate(['/']);
        });
      }
    }
  }

  signUp() {
    this.router.navigate(['/signup']);
  }
}
