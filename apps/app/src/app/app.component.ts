import { NxWelcomeComponent } from './nx-welcome.component';
import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, NavbarComponent],
  selector: 'poke-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app';
}
