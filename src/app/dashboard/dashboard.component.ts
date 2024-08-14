import { IngresoEgresoService } from './../services/ingreso-egreso.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import {
  IncomeExpense,
  IncomeExpenseModel,
} from '../models/income-expense.model';
import * as ingresoEgresoAction from '../ingreso-egreso/store/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  subscription!: Subscription;

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) {}

  ngOnInit(): void {
    /***
     *  nesting subscribe calls (subscribing within a subscription) is generally considered an anti-pattern in RxJS
     *  because it can lead to issues such as memory leaks and difficulties in managing the observable stream.
     *  The recommended approach is to use RxJS operators like switchMap, mergeMap, or concatMap
     *  to flatten these nested observables and keep your code more maintainable.
     */
    // this.subscription = this.store
    //   .select('user')
    //   .pipe(filter((authUser) => authUser.user != null))
    //   .subscribe((authUser) => {
    //     if (authUser.user?.uid) {
    //       this.ingresoEgresoService
    //         .initIncomeExpenseListener(authUser.user.uid)
    //         .subscribe((incomeExpenseFromFB: IncomeExpenseModel[]) => {
    //           this.store.dispatch(
    //             ingresoEgresoAction.setItems({ items: incomeExpenseFromFB })
    //           );
    //         });
    //     }
    //   });

    /**
     * Best practice
     */
    this.store
      .select('user')
      .pipe(
        filter((authUser) => authUser.user != null),
        switchMap((authUser) => {
          if (authUser.user?.uid) {
            return this.ingresoEgresoService.initIncomeExpenseListener(
              authUser.user.uid
            );
          }
          // Handle case where user is null or return an empty observable
          return [];
        })
      )
      .subscribe((incomeExpenseFromFB: IncomeExpenseModel[]) => {
        this.store.dispatch(
          ingresoEgresoAction.setItems({ items: incomeExpenseFromFB })
        );
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
