import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../../components/header/header.component';


@Component({
	selector: 'poke-app-profile',
	standalone: true,
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css'],
	imports: [HeaderComponent,CommonModule],
})
export class ProfileComponent {
	isLoggedIn$: Observable<boolean> = this.auth.isLoggedIn$;
	constructor(private readonly auth: AuthService) {}

	logout() {
		this.auth.signOut()
	}
}
