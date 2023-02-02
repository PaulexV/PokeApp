import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
	imports: [HeaderComponent, CommonModule],
})
export class ProfileComponent implements OnInit {
	description = '';
	isLoggedIn$: Observable<boolean> = this.auth.isLoggedIn$;
	user: Observable<PokeUser | null>;

	stream: MediaStream | undefined;

	@ViewChild('video')
	video: ElementRef | undefined;

	@ViewChild('canvas')
	canvas: ElementRef | undefined;

	captures: Array<any> | undefined;

	public ngOnInit() {
		navigator.mediaDevices.getUserMedia({ video: { width: 200, height: 200 } }).then((stream) => {
			console.log('> stream', stream);
			this.stream = stream;
		});
	}

	public capture() {
		const video = document.querySelector("video")
		this.canvas?.nativeElement.getContext('2d').drawImage(video, 0, 0, 200, 200);
		console.log(this.canvas?.nativeElement.toDataURL('image/png'))
	}

	constructor(
		private readonly auth: AuthService,
		private readonly huntservice: HuntService,
		private readonly profileservice: ProfileService
	) {
		this.user = this.huntservice.getProfile();
	}

	changeDescription(data: string) {
		this.user.pipe(take(1)).subscribe((user) => {
			this.profileservice.updateDescription(user as PokeUser, data);
		});
	}
	logout() {
		this.auth.signOut();
	}
}
