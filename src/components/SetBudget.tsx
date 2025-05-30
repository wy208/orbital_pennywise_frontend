import { useState } from 'react';

interface CategoryBudget {
  category: string;
  amount: number;
}

interface SetBudgetProps {
  currentBudgets: Record<string, number>; 
  onBudgetSubmit: (category: string, amount: number) => void;
}

const categories = ["Food", "Transport", "Groceries", "Shopping", "Bills", "Other"];

function SetBudget({ currentBudgets, onBudgetSubmit }: SetBudgetProps) {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [budgetInput, setBudgetInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(budgetInput);
    if (!isNaN(amount)) {
      onBudgetSubmit(selectedCategory, amount);
      setBudgetInput('');
    }
  };

  return (
    <div className="set-budget">
      <form onSubmit={handleSubmit}>
        <label>
          Category:
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Budget for {selectedCategory}:
          <input
            type="number"
            value={budgetInput}
            onChange={(e) => setBudgetInput(e.target.value)}
            placeholder="Enter amount"
            min="0"
          />
        </label>
        <button type="submit">
          {currentBudgets[selectedCategory] ? 'Update Budget' : 'Save Budget'}
        </button>
      </form>
    </div>
  );
}

export default SetBudget;
