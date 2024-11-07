import { isLoading, stopLoading } from './../../shared/ui.actions';
import { appReducer } from './../../app.reducer';
import { Component, ErrorHandler, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import Swal from 'sweetalert2';

/*NgRx */
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as ui from '../../shared/ui.actions';

import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  subscriptions!: Subscription;
  isLoading!: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.subscriptions = this.store.select('ui').subscribe((ui) => {
      this.isLoading = ui.isLoading;
    });
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  getLoginControl(controlName: string): FormControl {
    return this.loginForm.get(controlName) as FormControl;
  }

  loginUser() {
    if (this.loginForm.invalid) {
      return;
    }
    // preloading
    // Swal.fire({
    //   title: 'Wait please!',
    //   didOpen: () => {
    //     Swal.showLoading();
    //   },
    // });
    this.store.dispatch(ui.isLoading());
    const { email, password } = this.loginForm.value;
    this.authService
      .loginUser(email, password)
      .then((user) => {
        if (user) {
          // kill prealoading
          // Swal.close();
          this.store.dispatch(ui.stopLoading());
          this.router.navigate(['/']);
        }
      })
      .catch((err: Error) => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        });
      });
  }
}
