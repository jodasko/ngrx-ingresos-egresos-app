import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

import { ChartConfiguration } from 'chart.js';

import { IncomeExpenseModel } from 'src/app/models/income-expense.model';
import { getIncomeExpenses } from '../store/ingreso-egreso.reducers';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.scss'],
})
export class EstadisticaComponent implements OnInit {
  income = 0;
  expense = 0;
  totalIncome = 0;
  totalExpense = 0;

  // Doughnut chart
  doughnutChartLabels: string[] = ['Incomes', 'Expenses'];
  doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    { data: [0, 0] },
  ];
  doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false,
  };

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select(getIncomeExpenses).subscribe((items) => {
      this.calculateStatistic(items);
    });
  }

  calculateStatistic(items: IncomeExpenseModel[]) {
    // reset
    this.income = 0;
    this.expense = 0;
    this.totalIncome = 0;
    this.totalExpense = 0;

    for (const item of items) {
      if (item.type === 'income') {
        this.totalIncome += item.amount;
        this.income++;
      } else {
        this.totalExpense += item.amount;
        this.expense++;
      }
    }
    this.doughnutChartDatasets = [
      { data: [this.totalIncome, this.totalExpense] },
    ];
  }
}
