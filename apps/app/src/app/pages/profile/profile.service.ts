import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable, of, switchMap } from 'rxjs';
import { PokeUser } from '../../models/user';
import { AuthService } from '../../services/auth.service';




@Injectable({
    providedIn: 'root',
  })
  export class ProfileService {
    constructor(
      private readonly authService: AuthService,
      private readonly firestore: Firestore,
	  private readonly httpService: HttpClient,
    ) {}

    getProfile(): Observable<PokeUser | null> {
        return this.authService.user$.pipe(
          switchMap((user) => {
            if (user) {
              const id = user?.uid;
              return this.getProfileData(id);
            }
            return of(null);
          })
        );
      }
    
      private getProfileData(userId: string): Observable<PokeUser> {
        const profile = doc(this.firestore, `users/${userId}`);
        return docData(profile) as Observable<PokeUser>;
      }

    updateDescription(user: PokeUser){
        updateDoc(doc(this.firestore,'users', user.id, description),{
            description: user.description

        })
    }

  }
