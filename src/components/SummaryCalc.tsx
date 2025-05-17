import { Expense } from "../types";

interface SummaryCalcProps {
  expenses: Expense[];
}

const SummaryCalc = ({ expenses }: SummaryCalcProps) => {
  const calculateTotal = (expenses: Expense[]): number => {
    return expenses.reduce((total, expense) => {
      return total + parseFloat(expense.amount);
    }, 0);
  };

  return (
    <div>
      <h2>Summary</h2>
      <p>Total spent: ${calculateTotal(expenses)}</p>
    </div>
  );
};

export default SummaryCalc;