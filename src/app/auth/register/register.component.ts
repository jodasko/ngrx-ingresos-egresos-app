import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
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
    Swal.fire({
      title: 'Wait please!',
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const { fullName, email, password } = this.registerForm.value;
    this.authService
      .createNewUser(fullName, email, password)
      .then((credential) => {
        Swal.close();
        this.router.navigate(['/']);
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
