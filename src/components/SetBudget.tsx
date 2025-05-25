import { useState } from 'react';

interface SetBudgetProps {
  currentBudget: number | null;
  onBudgetSubmit: (amount: number) => void;
}

function SetBudget({ currentBudget, onBudgetSubmit }: SetBudgetProps) {
  const [budgetInput, setBudgetInput] = useState(
    currentBudget?.toString() || ''
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(budgetInput);
    if (!isNaN(amount)) {
      onBudgetSubmit(amount);
    }
  };

  return (
    <div className="set-budget">
      <form onSubmit={handleSubmit}>
        <label>
          Set Your Budget:
          <input
            type="number"
            value={budgetInput}
            onChange={(e) => setBudgetInput(e.target.value)}
            placeholder="Enter amount"
            min="0"
          />
        </label>
        <button type="submit">
          {currentBudget ? 'Update Budget' : 'Save Budget'}
        </button>
      </form>
    </div>
  );
}

export default SetBudget;