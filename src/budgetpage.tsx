import SetBudget from './components/SetBudget';
import SetGoal from './components/SetGoal';
import BudgetStatus from './components/BudgetStatus';

interface BudgetPageProps {
  budget: number | null;
  onBudgetChange: (newBudget: number) => void;
  totalSpending: number;
}

function BudgetPage({ budget, totalSpending, onBudgetChange }: BudgetPageProps) {

    return (
        <div>
            <h2>Budgeting:</h2>
            <BudgetStatus budget={budget} totalSpending={totalSpending} />
            <SetBudget
                currentBudget={budget}
                onBudgetSubmit={onBudgetChange} 
            />

            <h2>Goals and Challenges:</h2>
            <SetGoal />
        </div>
  );
}

export default BudgetPage;
