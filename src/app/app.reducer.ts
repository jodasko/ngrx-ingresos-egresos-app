import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducers';
import * as IncomeExpense from './ingreso-egreso/store/ingreso-egreso.reducers';

export interface AppState {
  ui: ui.State;
  user: auth.UserState;
  IncomeExpense: IncomeExpense.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  user: auth.authReducer,
  IncomeExpense: IncomeExpense.incomeExpenseReducer,
};
