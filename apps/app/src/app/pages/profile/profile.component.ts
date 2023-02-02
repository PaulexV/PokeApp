import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../../components/header/header.component';
import { PokeUser } from '../../models/user';
import { HuntService } from '../hunt/hunt.service';




@Component({
	selector: 'poke-app-profile',
	standalone: true,
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css'],
	imports: [HeaderComponent,CommonModule],
})
export class ProfileComponent {
	isLoggedIn$: Observable<boolean> = this.auth.isLoggedIn$;
	user: Observable<PokeUser | null>

	constructor(private readonly auth: AuthService,private readonly huntservice:HuntService) {
		this.user = this.huntservice.getProfile();
		console.log(this.user)
	}

	


	logout() {
		this.auth.signOut()
	}
}
