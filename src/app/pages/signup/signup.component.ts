import {Component, inject} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CPFUtil} from "../../../models/utils/cpf";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  authService = inject(AuthService);
  router = inject(Router);
  cpfUtil = inject(CPFUtil);

  sending: boolean = false;
  error: boolean = false;

  public signupForm = new FormGroup({
    cpf: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    function: new FormControl('', [Validators.required]),
    shelter: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    password2: new FormControl('', [Validators.required])
  });

  public submit() {
    if (this.signupForm.value.password !== this.signupForm.value.password2) {
      alert('As senhas não coincidem');
      return;
    }
    // @ts-ignore
    if (this.signupForm.valid && this.cpfUtil.validateCPF(this.signupForm.value.cpf)) {
      let obj = {
        cpf: this.signupForm.value.cpf,
        name: this.signupForm.value.name,
        password: this.signupForm.value.password,
        role: this.signupForm.value.function,
        shelterId: this.signupForm.value.shelter
      };
      this.error = false;
      // console.log(obj)
      this.authService.signup(obj).subscribe({
        next: () => {
          this.router.navigate(['/login']);
          this.sending = false;
        },
        error: (err) => {
          console.log(err)
          this.sending = false;
          this.error = true;
        }
      });
    }
  }

  signIn() {
    this.router.navigate(['/login']);
  }
}
