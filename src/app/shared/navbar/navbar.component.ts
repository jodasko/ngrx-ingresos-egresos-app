import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  adminUser = '';
  constructor(private store: Store<AppState>) {}
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
}
