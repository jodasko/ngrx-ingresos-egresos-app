import { Pipe, PipeTransform } from '@angular/core';
import { IncomeExpenseModel } from '../models/income-expense.model';

@Pipe({
  name: 'sortByType',
})
export class SortByTypePipe implements PipeTransform {
  // For: Option 2
  private sortingStrategies: {
    [key: string]: (a: IncomeExpenseModel, b: IncomeExpenseModel) => number;
  } = {
    income: (itemA, itemB) => (itemA.type === 'income' ? -1 : 1),
    expense: (itemA, itemB) => (itemA.type === 'expense' ? -1 : 1),
  };

  transform(items: IncomeExpenseModel[], type: string): IncomeExpenseModel[] {
    if (!items) return [];
    // Opt 1: Switch
    const sortedItems = [...items];
    switch (type) {
      case 'income':
        return sortedItems.sort((itemA, itemB) =>
          itemA.type === 'income' ? -1 : 1
        );
      case 'expense':
        return sortedItems.sort((itemA, itemB) =>
          itemA.type === 'expense' ? -1 : 1
        );
      default:
        return items;
    }

    // Opt 2: Dictionary/Object
    // const sortingStrategy = this.sortingStrategies[type];
    // return sortingStrategy ? sortedItems.sort(sortingStrategy) : items;
  }
}
