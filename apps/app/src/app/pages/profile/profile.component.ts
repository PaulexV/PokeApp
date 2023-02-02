import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../../components/header/header.component';
import { PokeUser } from '../../models/user';
import { HuntService } from '../hunt/hunt.service';
// import { profileService } from './profile.service';
import { doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';







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




	constructor(private readonly auth: AuthService,private readonly huntservice: HuntService,private readonly profileservice: profileService) {
		this.user = this.huntservice.getProfile();
		
	}

	updateDescription(description: PokeUser){
		// updateDoc(doc(this.firestore, 'users',user.id)),{
		// 	description: user.description;
		// })
	}
	logout() {
		this.auth.signOut()
	}
}
