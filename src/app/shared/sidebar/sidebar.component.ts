import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  logout() {
    this.authService
      .logout()
      .then(() => {
        // preloading
        Swal.fire({
          title: 'bye bye!',
          didOpen: () => {
            Swal.showLoading();
          },
        });
        // kill prealoading
        Swal.close();
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
