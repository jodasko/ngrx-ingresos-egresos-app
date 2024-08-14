import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AppState } from 'src/app/app.reducer';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  adminUser = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store
      .select('user')
      .pipe(filter((resp) => resp.user != null))
      .subscribe(({ user }) => {
        if (user) {
          this.adminUser = user.name;
        }
      });
  }

  logout() {
    // this.authService
    //   .logout()
    //   .then(() => {
    //     // preloading
    //     Swal.fire({
    //       title: 'bye bye!',
    //       didOpen: () => {
    //         Swal.showLoading();
    //       },
    //     });
    //     // kill prealoading
    //     Swal.close();
    //     this.router.navigate(['/login']);
    //   })
    //   .catch((err: Error) => {
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Oops...',
    //       text: err.message,
    //     });
    //   });
    this.authService
      .logout()
      .then(() => {
        this.router.navigate(['/login']);
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
