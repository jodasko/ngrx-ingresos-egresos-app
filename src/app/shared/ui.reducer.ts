import { createReducer, on } from '@ngrx/store';
import * as action from './ui.actions';

export interface State {
  isLoading: boolean;
}

export const initState: State = {
  isLoading: false,
};

export const uiReducer = createReducer(
  initState,
  on(action.isLoading, (state) => ({ ...state, isLoading: true })),
  on(action.stopLoading, (state) => ({ ...state, isLoading: false }))
);
