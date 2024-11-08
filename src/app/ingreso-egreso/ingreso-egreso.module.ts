import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

import { StoreModule } from '@ngrx/store';
import { incomeExpenseReducer } from './store/ingreso-egreso.reducers';

import { SharedModule } from '../shared/shared.module';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';

import { DashboardComponent } from './../dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';
import { SortByTypePipe } from '../pipes/sort-by-type.pipe';

@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    SortByTypePipe,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('IncomeExpense', incomeExpenseReducer),
    ReactiveFormsModule,
    NgChartsModule,
    SharedModule,
    DashboardRoutesModule,
  ],
})
export class IngresoEgresoModule {}
