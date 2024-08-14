import { Pipe, PipeTransform } from '@angular/core';
import { IncomeExpenseModel } from '../models/income-expense.model';

@Pipe({
  name: 'sortByType',
})
export class SortByTypePipe implements PipeTransform {
  private sortingStrategies: {
    [key: string]: (a: IncomeExpenseModel, b: IncomeExpenseModel) => number;
  } = {
    income: (itemA, itemB) => (itemA.type === 'income' ? -1 : 1),
    expense: (itemA, itemB) => (itemA.type === 'expense' ? -1 : 1),
    // Add more sorting strategies here if needed
  };

  transform(items: IncomeExpenseModel[], type: string): IncomeExpenseModel[] {
    if (!items) return [];
    // if (type === 'income') {
    //   return [...items].sort((itemA, itemB) => {
    //     return itemA.type === 'income' ? -1 : 1;
    //   });
    // } else if (type === 'expense') {
    //   return [...items].sort((itemA, itemB) => {
    //     return itemA.type === 'expense' ? -1 : 1;
    //   });
    // } else {
    //   return items;
    // }

    /**
     * Opt 1: Switch
     */
    const sortedItems = [...items]; // Create a copy of the array to avoid mutation
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
        return items; // Return the original order
    }

    /**
     * Opt 2: Dictionary/Object
     */
    // const sortingStrategy = this.sortingStrategies[type];
    // return sortingStrategy ? sortedItems.sort(sortingStrategy) : items;
  }
}
