import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, take } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../../components/header/header.component';
import { PokeUser } from '../../models/user';
import { HuntService } from '../hunt/hunt.service';
import { ProfileService } from './profile.service';
import {
	getDownloadURL,
	ref,
	Storage,
	uploadBytes,
  } from '@angular/fire/storage';


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

	@ViewChild('canvas')
	canvas: ElementRef | undefined;

	public ngOnInit() {
		navigator.mediaDevices.getUserMedia({ video: { width: 200, height: 200 } }).then((stream) => {
			this.stream = stream;
		});
	}

	public capture() {
		const video = document.querySelector("video")
		this.canvas?.nativeElement.getContext('2d').drawImage(video, 0, 0, 200, 200);
		const B64IMG = this.canvas?.nativeElement.toDataURL('image/png')
		const u8arr = this.toByteArray(B64IMG)
		const filename = 'test.jpeg'
		const file : File = new File([u8arr],filename,{type: 'image/jpeg'})
		console.log(this.canvas?.nativeElement.toDataURL('image/png'))
		console.log(B64IMG)

		const fileDetails = ref(this.storage, filename);
		uploadBytes(fileDetails, file)
		  .then(() => {
			return getDownloadURL(fileDetails);
		  })
		  .then((url) => console.log(url));
		

	}	
	

	private toByteArray(B64IMG: string) {
		const bstr = atob(B64IMG);
		let n = bstr.length;
		const u8arr = new Uint8Array(n);
		while (n--) {
		  u8arr[n] = bstr.charCodeAt(n);
		}
		return u8arr;
	  }
	constructor(
		private readonly auth: AuthService,
		private readonly huntservice: HuntService,
		private readonly profileservice: ProfileService,
		private readonly storage: Storage
	) {
		this.user$ = this.huntservice.getProfile();
	}

	changeDescription(data: string) {
		this.user$.pipe(take(1)).subscribe((user) => {
			this.profileservice.updateDescription(user as PokeUser, data);
		});
	}

	// test() {
	// 	this.user$.pipe(take(1)).subscribe(user => {
	// 		if(user){
	// 			const Name = this.user$.name
	// 		}
	// 	})		
	// }



	logout() {
		this.auth.signOut();
	}
}
