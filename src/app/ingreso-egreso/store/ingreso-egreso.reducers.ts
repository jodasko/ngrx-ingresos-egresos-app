import {
  createReducer,
  on,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as ingresoEgresoAction from './ingreso-egreso.actions';
import { IncomeExpense } from '../../models/income-expense.model';

export interface State {
  items: IncomeExpense[];
}

export const initialState: State = {
  items: [],
};

const getIncomeExpenseState = createFeatureSelector<State>('IncomeExpense');

export const getIncomeExpenses = createSelector(
  getIncomeExpenseState,
  (state: State) => state.items
);

export const incomeExpenseReducer = createReducer(
  initialState,
  on(ingresoEgresoAction.setItems, (state, { items }) => {
    return {
      ...state,
      items: [...items],
    };
  }),
  on(ingresoEgresoAction.unSetItems, (state) => {
    return { ...state, items: [] };
  })
);
