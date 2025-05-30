import SetBudget from './components/SetBudget';
import SetGoal from './components/SetGoal';
import BudgetStatus from './components/BudgetStatus';
import { Expense } from './types';

interface BudgetPageProps {
  budgets: Record<string, number>;
  onBudgetChange: (category: string, amount: number) => void;
  expenses: Expense[];
}

function BudgetPage({ budgets, expenses, onBudgetChange }: BudgetPageProps) {
  // compute spending per category
  const categoryTotals: Record<string, number> = {};
  for (const exp of expenses) {
    if (!exp.category) continue;
    categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + parseFloat(exp.amount);
  }

  return (
    <div>
      <h2>Budgeting:</h2>
      {Object.keys(budgets).map((category) => {
        const spent = categoryTotals[category] || 0;
        const budget = budgets[category];
        const percent = Math.round((spent / budget) * 100);

        return (
          <p key={category}>
            {category}: You’ve spent <strong>${spent}</strong> of your <strong>${budget}</strong> budget ({percent}%)
          </p>
        );
      })}

      <SetBudget currentBudgets={budgets} onBudgetSubmit={onBudgetChange} />

      <h2>Goals and Challenges:</h2>
      <SetGoal />
    </div>
  );
}

export default BudgetPage;
