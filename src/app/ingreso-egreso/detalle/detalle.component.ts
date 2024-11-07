import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { getIncomeExpenses } from '../store/ingreso-egreso.reducers';

import Swal from 'sweetalert2';

import { IncomeExpenseModel } from 'src/app/models/income-expense.model';
import { IngresoEgresoService } from './../../services/ingreso-egreso.service';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit, OnDestroy {
  incomeExpenses: IncomeExpenseModel[] = [];
  subscription!: Subscription;
  sortingByType = 'default';

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select(getIncomeExpenses)
      .subscribe((items) => {
        this.incomeExpenses = items;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  setSortingBytype(type: string): void {
    this.sortingByType = type;
  }

  deleteItem(id: string | undefined) {
    Swal.fire({
      title: 'Do you really want to delete this item?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No, sorry!!',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        if (id) {
          this.ingresoEgresoService
            .deleteIncomeExpense(id)
            ?.then(() => {
              Swal.fire({
                title: 'Deleted!',
                timer: 1000,
              });
            })
            .catch((err: Error) =>
              Swal.fire({
                title: 'Error!',
                text: err.message,
                timer: 1000,
              })
            );
        }
      } else if (result.isDenied) {
        Swal.fire('Item is not deleted', '', 'info');
      }
    });
  }
}
