import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, take } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../../components/header/header.component';
import { PokeUser } from '../../models/user';
import { HuntService } from '../hunt/hunt.service';
import { ProfileService } from './profile.service';
import { ref, Storage, uploadBytes } from '@angular/fire/storage';

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
	user$: Observable<PokeUser | null>;

	stream: MediaStream | undefined;
	camera_on = false

	@ViewChild('canvas')
	canvas: ElementRef | undefined;

	@ViewChild('filePreview')
	private filePreview!: ElementRef;

	profile_picture = "../../../assets/pp.png"

	public ngOnInit() {
		navigator.mediaDevices.getUserMedia({ video: { width: 200, height: 200 } }).then((stream) => {
			this.stream = stream;
		});
	}

	public capture() {
		const video = document.querySelector('video');
		this.canvas?.nativeElement.getContext('2d').drawImage(video, 0, 0, 200, 200);
		const B64IMG = this.canvas?.nativeElement.toDataURL('image/png');

		fetch(B64IMG)
			.then((res) => res.blob())
			.then((blob) => {
				this.user$.pipe(take(1)).subscribe((user) => {
					const filename = user?.id + ".png";
					const file = new File([blob], filename, { type: 'image/png' });

					const fileDetails = ref(this.storage, filename);
					uploadBytes(fileDetails, file).then(() => {
						this.updateProfilePicture()
					});
				});
			});
	}

	constructor(
		private readonly auth: AuthService,
		private readonly huntservice: HuntService,
		private readonly profileservice: ProfileService,
		private readonly storage: Storage
	) {
		this.user$ = this.huntservice.getProfile();
		this.updateProfilePicture()
	}

	changeDescription(data: string) {
		this.user$.pipe(take(1)).subscribe((user) => {
			this.profileservice.updateDescription(user as PokeUser, data);
		});
	}

	updateProfilePicture(){
		this.user$.pipe(take(1)).subscribe((user) => {
<<<<<<< HEAD
			const url = `https://firebasestorage.googleapis.com/v0/b/poke-app-bf936.appspot.com/o/${user?.id}.png?alt=media&t=${new Date().getTime()}`
			const link = this.getImageOrFallback(
					url, "../../../assets/pp.png"
				).then(result => this.profile_picture = result as string)
			this.profile_picture = url
		})
	}

	getImageOrFallback(path: string, fallback: string){
		return new Promise(resolve => {
		  const img = new Image();
		  img.src = path;
		  img.onload = () => resolve(path);
		  img.onerror = () => resolve(fallback);
		});
	  };
	
=======
			this.profile_picture = `https://firebasestorage.googleapis.com/v0/b/poke-app-bf936.appspot.com/o/${user?.id}.png?alt=media&t=${new Date().getTime()}`
		})
	}

>>>>>>> origin/main
	toggleCamera() {
		this.camera_on = !this.camera_on
	}

	logout() {
		this.auth.signOut();
	}
}
