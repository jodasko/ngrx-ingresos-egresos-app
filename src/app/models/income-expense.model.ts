export class IncomeExpense {
  constructor(
    public description: string,
    public amount: number,
    public type: string
  ) {}
}

export interface IncomeExpenseModel {
  description: string;
  amount: number;
  type: string;
  id?: string;
}
