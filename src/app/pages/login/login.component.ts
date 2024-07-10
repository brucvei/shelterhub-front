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
  error: boolean = false;

  ngOnInit(): void {
    if (this.url.snapshot.paramMap.get('id')) {
      this.volunteer = true;
      this.loginForm.get('password')?.removeValidators(Validators.required);
    } else {
      this.loginForm.get('name')?.removeValidators(Validators.required);
    }
  }

  submit() {
    if (!this.volunteer) {
      // @ts-ignore
      if (this.loginForm.valid && this.cpfUtil.validateCPF(this.loginForm.value.cpf)) {
        let obj = {
          cpf: this.loginForm.value.cpf,
          password: this.loginForm.value.password
        }
        this.error = false;
        this.sending = true;
        this.authService.login(obj).subscribe({
          next: () => {
            this.router.navigate(['/home']);
            this.sending = false;
          }, error: err => {
            console.log(err);
            this.sending = false;
            this.error = true;
          }
        });
      }
    } else {
      // @ts-ignore
      if (this.loginForm.valid && this.cpfUtil.validateCPF(this.loginForm.value.cpf)) {
        let obj = {
          cpf: this.loginForm.value.cpf,
          name: this.loginForm.value.name,
          shelterId: this.url.snapshot.paramMap.get('id')
        }
        this.error = false;
        this.sending = true;
        this.authService.loginVolunteer(obj).subscribe({
          next: (resp) => {
            console.log(resp)
            let url = '/shelter/' + this.url.snapshot.paramMap.get('id');
            console.log(url)
            this.sending = false;
            this.router.navigate([url]);
          }, error: err => {
            console.log(err);
            this.sending = false;
            this.error = true;
          }
        });
      }
    }
  }

  signUp() {
    this.router.navigate(['/signup']);
  }
}
