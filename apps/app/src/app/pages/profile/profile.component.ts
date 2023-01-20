import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'poke-app-profile',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
	isLoggedIn$: Observable<boolean> = this.auth.isLoggedIn$;
	constructor(private readonly auth: AuthService) {}

	logout() {
		this.auth.signOut()
	}
}
