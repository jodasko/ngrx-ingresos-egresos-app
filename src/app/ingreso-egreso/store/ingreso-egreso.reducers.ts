import { createReducer, on } from '@ngrx/store';
import * as ingresoEgresoAction from './ingreso-egreso.actions';
import { IncomeExpense } from '../../models/income-expense.model';

export interface State {
  items: IncomeExpense[];
}

export const initialState: State = {
  items: [],
};

export const incomeExpenseReducer = createReducer(
  initialState,
  on(ingresoEgresoAction.setItems, (state, { items }) => ({
    ...state,
    items: [...items],
  })),
  on(ingresoEgresoAction.unSetItems, (state) => ({ ...state, items: [] }))
);
