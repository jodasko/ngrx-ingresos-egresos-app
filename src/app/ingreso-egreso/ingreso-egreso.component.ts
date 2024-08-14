import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IngresoEgresoService } from './../services/ingreso-egreso.service';
import { IncomeExpense } from './../models/income-expense.model';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as ui from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.scss'],
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  ingresoEgresoForm!: FormGroup;
  typeOfAmount: TypeOfAmount = 'income';
  isIncome = true;
  isLoading!: boolean;
  subscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.ingresoEgresoForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', Validators.required],
    });

    this.subscription = this.store.select('ui').subscribe((ui) => {
      this.isLoading = ui.isLoading;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  save() {
    if (this.ingresoEgresoForm.invalid) {
      return;
    }
    this.store.dispatch(ui.isLoading());
    const { description, amount } = this.ingresoEgresoForm.value;
    const incomeExpense = new IncomeExpense(
      description,
      amount,
      this.typeOfAmount
    );

    this.ingresoEgresoService
      .createIncomeExpense(incomeExpense)
      .then(() => {
        this.ingresoEgresoForm.reset();
        Swal.fire('Register created!', description, 'success');
        this.store.dispatch(ui.stopLoading());
      })
      .catch((err) => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire('Error!', description, 'error');
      });
  }

  toggleTypeOfAmount() {
    this.isIncome = !this.isIncome;
    this.typeOfAmount = this.isIncome ? 'income' : 'expense';
  }
}

type TypeOfAmount = 'income' | 'expense';
