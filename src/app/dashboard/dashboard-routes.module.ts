import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';
import { authGuard } from '../services/auth.guard';

const childrenRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: dashboardRoutes,
    // canActivate: [authGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(childrenRoutes)],
  exports: [RouterModule],
})
export class DashboardRoutesModule {}
