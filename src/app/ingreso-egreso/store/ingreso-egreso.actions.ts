import { createAction, props } from '@ngrx/store';
import { IncomeExpense } from '../../models/income-expense.model';

export const setItems = createAction(
  '[Ingreso Egreso] set Items',
  props<{ items: IncomeExpense[] }>()
);
export const unSetItems = createAction('[Ingreso Egreso] unset Items');
