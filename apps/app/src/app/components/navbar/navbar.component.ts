import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
	standalone: true,
	selector: 'poke-app-navbar',
	imports: [RouterModule],
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
	isLoggedIn$: Observable<boolean>;

	constructor(private authService: AuthService) {}

	ngOnInit() {
		this.isLoggedIn$ = this.authService.isLoggedIn;
	}
}
