import { useState, useEffect } from "react";

interface SetBudgetProps {
  totalBudget: number;
  categoryBudgets: Record<string, number>;
  onBudgetSubmit: (type: "total" | "category", category: string, amount: number) => void;
}

function SetBudget({ totalBudget, categoryBudgets, onBudgetSubmit }: SetBudgetProps) {
  const [editMode, setEditMode] = useState<"total" | "category">("total");
  const [currentCategory, setCurrentCategory] = useState("Food");
  const [amount, setAmount] = useState("");

  const categories = ["Food", "Transport", "Groceries", "Shopping", "Bills", "Other"];

  // Sync input amount with selected mode and category budgets on changes
  useEffect(() => {
    if (editMode === "total") {
      setAmount(totalBudget > 0 ? totalBudget.toString() : "");
    } else {
      setAmount(
        categoryBudgets[currentCategory] !== undefined
          ? categoryBudgets[currentCategory].toString()
          : ""
      );
    }
  }, [editMode, currentCategory, totalBudget, categoryBudgets]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount < 0) {
      alert("Please enter a valid positive number");
      return;
    }

    if (editMode === "total") {
      onBudgetSubmit("total", "total", numAmount);
    } else {
      onBudgetSubmit("category", currentCategory, numAmount);
    }
    setAmount(""); // clear input after submit
  };

  return (
    <div className="set-budget">
      <h3>Set Budget</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <input
              type="radio"
              checked={editMode === "total"}
              onChange={() => setEditMode("total")}
            />
            Total Budget
          </label>
          <label>
            <input
              type="radio"
              checked={editMode === "category"}
              onChange={() => setEditMode("category")}
            />
            Category Budget
          </label>
        </div>

        {editMode === "category" && (
          <select
            value={currentCategory}
            onChange={(e) => setCurrentCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        )}

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder={`Enter ${editMode} budget`}
          step="0.01"
          min="0"
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default SetBudget;