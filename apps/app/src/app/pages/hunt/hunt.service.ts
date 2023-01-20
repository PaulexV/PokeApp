import { Injectable } from "@angular/core";
import { doc, docData, Firestore, setDoc, updateDoc } from "@angular/fire/firestore";
import { Observable, of, switchMap } from "rxjs";
import { PokeUser } from "../../models/user";
import { AuthService } from "../../services/auth.service";

@Injectable({
    providedIn: 'root',
  })
  export class HuntService {
    constructor(
      private readonly authService: AuthService,
      private readonly firestore: Firestore
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

    updatePokeballsAndCooldowns(user: PokeUser) {
      updateDoc(doc(this.firestore, 'users', user.id), {
        cooldown: user.cooldown, inventory: user.inventory
      })
    }

    updateEnergy({energy, id, cooldown}: PokeUser) {
      updateDoc(doc(this.firestore, 'users', id), {
        energy, cooldown
      })
    }
  }