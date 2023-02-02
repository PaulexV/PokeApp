import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, take } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../../components/header/header.component';
import { PokeUser } from '../../models/user';
import { HuntService } from '../hunt/hunt.service';
import { ProfileService } from './profile.service';




@Component({
	selector: 'poke-app-profile',
	standalone: true,
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css'],
	imports: [HeaderComponent,CommonModule],
})
export class ProfileComponent {
	description =  "";
	isLoggedIn$: Observable<boolean> = this.auth.isLoggedIn$;
	user: Observable<PokeUser | null>

	constructor(private readonly auth: AuthService,private readonly huntservice: HuntService,private readonly profileservice: ProfileService) {

		this.user = this.huntservice.getProfile();
		
	}

	changeDescription(data: string){
		this.user.pipe(take(1)).subscribe(user =>{
			const description = data

			this.profileservice.updateDescription(user,description)

		})
		
	}
	logout() {
		this.auth.signOut()
	}
}
