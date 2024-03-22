import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth-service/auth.service";

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent {

  @Output() toggleActiveForm = new EventEmitter<void>;

  signUpForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.signUpForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  signup() {
    if (this.signUpForm.valid) {
      const registerRequest = {
        firstName: this.signUpForm.get('firstName')?.value,
        lastName: this.signUpForm.get('lastName')?.value,
        email: this.signUpForm.get('email')?.value,
        password: this.signUpForm.get('password')?.value
      }
      this.authService.signup(registerRequest).subscribe();
    }
  }
}
