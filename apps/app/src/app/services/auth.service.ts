import { Injectable } from '@angular/core';
import {
	Auth,
	authState,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	User,
} from '@angular/fire/auth';
import { catchError, from, map, NEVER, Observable, take } from 'rxjs';
import { Router } from '@angular/router';
import { doc, Firestore } from '@angular/fire/firestore';
import { setDoc } from '@firebase/firestore';
import { generateNewUser } from '../utils/generateNewUser';
import { FirebaseError } from '@angular/fire/app';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	isLoggedIn$: Observable<boolean> = authState(this.auth).pipe(map((user) => !!user));
	user$: Observable<User | null> = authState(this.auth);

	constructor(private readonly auth: Auth, private router: Router, private readonly firestore: Firestore) {}

	signIn(email: string, password: string, firebaseError: {[key: string]: string}) {
		from(signInWithEmailAndPassword(this.auth, email, password))
			.pipe(
				catchError((err) => {
					const error = this.convertErrorMessage(err)
					firebaseError['message'] = error.message
					return NEVER;
				}),
				take(1)
			)
			.subscribe(() => {
				this.router.navigateByUrl('/events');
			});
	}

	register(username: string, email: string, password: string) {
		from(createUserWithEmailAndPassword(this.auth, email, password))
			.pipe(
				catchError((err) => {
					console.log(err);
					return NEVER;
				}),
				take(1)
			)
			.subscribe((creds) => {
				setDoc(doc(this.firestore, 'users', creds.user.uid), generateNewUser(creds.user.uid, username));
				this.router.navigateByUrl('/events');
			});
	}



	signOut() {
		from(signOut(this.auth))
			.pipe(take(1))
			.subscribe(() => this.router.navigateByUrl('/'));
	}

  convertErrorMessage(error: FirebaseError): {type: string, message:string} {
    switch (error.code) {
      case "auth/user-not-found":
        return {type: "login", message:"Invalid email adress"}
      case "auth/wrong-password":
        return {type: "pwd", message:"Invalid password"}
      default:
        return {type:"other", message: error.code.split("/")[1].split("-").join(" ")}
    }
    
  }
}
