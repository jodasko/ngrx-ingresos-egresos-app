import { Component, ErrorHandler, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  getLoginControl(controlName: string): FormControl {
    return this.loginForm.get(controlName) as FormControl;
  }

  loginUser() {
    if (this.loginForm.invalid) {
      return;
    }
    // preloading
    Swal.fire({
      title: 'Wait please!',
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const { email, password } = this.loginForm.value;
    this.authService
      .loginUser(email, password)
      .then((user) => {
        console.log(user);
        if (user) {
          // kill prealoading
          Swal.close();
          this.router.navigate(['/']);
        }
      })
      .catch((err: Error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        });
      });
  }
}
