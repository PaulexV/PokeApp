import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { HeaderComponent } from '../../../components/header/header.component';

@Component({
  selector: 'poke-app-signin-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    HeaderComponent
  ],
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.css']
})
export class SigninPageComponent {
  registerForm = this.formBuilder.group({
    username: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', Validators.required),
    confirmPassword: new FormControl<string>('', Validators.required),
  }, {validator: this.checkIfMatchingPasswords('password', 'confirmPassword')});


checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
  return (group: FormGroup) => {
    const passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
    if (passwordInput.value !== passwordConfirmationInput.value) {
      return passwordConfirmationInput.setErrors({notEquivalent: true})
    }
    else {
        return passwordConfirmationInput.setErrors(null);
    }
  }
}

  get email() {
    return this.registerForm.get('email');
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly auth: AuthService
  ) {}

  doRegister() {
    const { username, email, password } = this.registerForm.value;
    this.auth.register(username || '', email || '', password || '');
  }
}
