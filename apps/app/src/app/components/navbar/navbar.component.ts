import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
	standalone: true,
	selector: 'poke-app-navbar',
	imports: [RouterModule],
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
	isLoggedIn$: Observable<boolean> | undefined;

	constructor(private authService: AuthService) {}

	ngOnInit() {
		this.isLoggedIn$ = this.authService.isLoggedIn$;
	}
}
