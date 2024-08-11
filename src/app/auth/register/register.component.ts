import { Component, OnDestroy, OnInit } from '@angular/core';
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

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup;
  subscriptions!: Subscription;
  isLoading!: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.subscriptions = this.store.select('ui').subscribe((ui) => {
      this.isLoading = ui.isLoading;
      console.log('Loading Register');
    });
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  // getters
  // get email() {
  //   return this.registerForm.get('email') as FormControl;
  // }

  // get password() {
  //   return this.registerForm.get('password') as FormControl;
  // }

  // get fullName() {
  //   return this.registerForm.get('fullName') as FormControl;
  // }

  // better appoach
  getRegisterControl(controlName: string): FormControl {
    return this.registerForm.get(controlName) as FormControl;
  }

  createAccount() {
    if (this.registerForm.invalid) {
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
    const { fullName, email, password } = this.registerForm.value;
    this.authService
      .createNewUser(fullName, email, password)
      .then((credential) => {
        // Swal.close();
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['/']);
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
