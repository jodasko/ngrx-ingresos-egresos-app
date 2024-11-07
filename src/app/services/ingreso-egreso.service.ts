import { Injectable } from '@angular/core';

import 'firebase/firestore';
import {
  AngularFirestore,
  DocumentReference,
} from '@angular/fire/compat/firestore';

import {
  IncomeExpense,
  IncomeExpenseModel,
} from '../models/income-expense.model';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IngresoEgresoService {
  constructor(
    private fireStore: AngularFirestore,
    private authService: AuthService
  ) {}

  createIncomeExpense(
    incomeExpenses: IncomeExpense
  ): Promise<DocumentReference> {
    if (this.authService.user && incomeExpenses) {
      return this.fireStore
        .doc(`${this.authService.user.uid}/income-expense`)
        .collection('items')
        .add({ ...incomeExpenses });
    } else {
      // Throw an error or return a rejected promise
      return Promise.reject(new Error('Item not added'));
    }
  }

  initIncomeExpenseListener(userId: string): Observable<IncomeExpenseModel[]> {
    return this.fireStore
      .collection(`${userId}/income-expense/items`)
      .snapshotChanges()
      .pipe(
        map((snapshot) => {
          return snapshot.map((doc) => {
            /**
             * ****extract all the props of collection from Firebase:
             * -- example
             * id: "00ASDASDDASS"
             * amount: 1000
             * description: "home"
             * type: "expense"
             * */
            const collectionData: any = doc.payload.doc.data();
            return {
              id: doc.payload.doc.id,
              ...collectionData,
            };
          });
        })
      );
  }

  deleteIncomeExpense(uid: string) {
    if (this.authService.user) {
      return this.fireStore
        .doc(`${this.authService.user.uid}/income-expense/items/${uid}`)
        .delete();
    }
    return null;
  }
}
