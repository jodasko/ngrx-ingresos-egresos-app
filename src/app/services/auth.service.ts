import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userState$ = this.isAuth();

  constructor(
    public auth: AngularFireAuth,
    private fireStore: AngularFirestore
  ) {}

  initAuthListener() {
    this.auth.authState.subscribe((fireBaseUser) => {
      console.log(fireBaseUser?.uid);
      console.log(fireBaseUser?.email);
    });
  }

  createNewUser(name: string, email: string, password: string) {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((fbUser) => {
        if (fbUser.user?.email) {
          const newUser = new User(fbUser.user.uid, name, fbUser.user.email);
          return this.fireStore
            .doc(`${fbUser.user.uid}/user`)
            .set({ ...newUser });
        } else {
          return null;
        }
      });
  }

  loginUser(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  private isAuth() {
    return this.auth.authState;
  }
}
