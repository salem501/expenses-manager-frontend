import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth-service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  @Output() toggleActiveForm = new EventEmitter<void>;

  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      const authRequest = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      }
      this.authService.login(authRequest).subscribe(
        (response) => {
          let jwToken = response.token;
          this.authService.saveToken(jwToken);
          this.router.navigateByUrl('/dashboard').then(r => {
          });
        }
      );
    }
  }
}
