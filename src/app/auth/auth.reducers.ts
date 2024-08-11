import { createReducer, on } from '@ngrx/store';
import * as userAction from './auth.actions';
import { User } from '../models/user.model';

export interface UserState {
  user: User | null;
}

export const initialState: UserState = {
  user: null,
};

export const authReducer = createReducer(
  initialState,
  on(userAction.setUser, (state, { user }) => ({
    ...state,
    user: { ...user },
  })),
  on(userAction.unSetUser, (state) => ({ user: null }))
);
