import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authAction from '../auth/auth.actions';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userState$ = this.isAuth();

  userSubscription!: Subscription;

  constructor(
    public auth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private store: Store<AppState>
  ) {}

  initAuthListener() {
    this.auth.authState.subscribe((fireBaseUser) => {
      if (fireBaseUser) {
        this.userSubscription = this.fireStore
          .doc(`${fireBaseUser.uid}/user`)
          .valueChanges()
          .subscribe((user: any) => {
            const fromFirebaseUser = User.fromFireBase(user);
            this.store.dispatch(authAction.setUser({ user: fromFirebaseUser }));
          });
      } else {
        // Does Not Exist
        console.log('entra Does Not Exist');
        this.userSubscription.unsubscribe();
        this.store.dispatch(authAction.unSetUser());
      }
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
