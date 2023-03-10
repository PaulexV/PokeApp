import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { HeaderComponent } from '../../../components/header/header.component';

@Component({
  selector: 'poke-app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    HeaderComponent
  ],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  firebaseError:{[key: string]: string} = {}

  loginForm = this.formBuilder.group({
    login: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', Validators.required),
  });

  get login() {
    return this.loginForm.get('login');
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly auth: AuthService
  ) {}

  doLogin() {
    this.firebaseError = {}
    const { login, password } = this.loginForm.value;
    this.auth.signIn(login || '', password || '', this.firebaseError);
  }
}
