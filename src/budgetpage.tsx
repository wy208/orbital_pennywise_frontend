import { useEffect, useState, useMemo } from "react";
import SetBudget from "./components/SetBudget";
import { Expense } from "./types";
import { getAuth, onAuthStateChanged } from "firebase/auth";

interface BudgetPageProps {
  expenses: Expense[];
}

function BudgetPage({ expenses }: BudgetPageProps) {
  const [totalBudget, setTotalBudget] = useState(0);
  const [categoryBudgets, setCategoryBudgets] = useState<Record<string, number>>({
    Food: 0,
    Transport: 0,
    Groceries: 0,
    Shopping: 0,
    Bills: 0,
    Other: 0,
  });

  const [userEmail, setUserEmail] = useState("");
  const now = new Date();
  const month = now.toISOString().slice(0, 7);

  const { totalSpent, categorySpending } = useMemo(() => {
    const spending: Record<string, number> = {};
    let total = 0;

    expenses
      .filter((exp) => exp.date.slice(0, 7) === month)
      .forEach((exp) => {
        const category = exp.category;
        const amount = parseFloat(exp.amount);
        if (category) {
          spending[category] = (spending[category] || 0) + amount;
        }
        total += amount;
      });

    return { totalSpent: total, categorySpending: spending };
  }, [expenses, month]);

  const fetchAndSetBudgetData = async (email: string) => {
    try {
      const budgetRes = await fetch(
        `http://localhost:3001/api/budget?userEmail=${email}&month=${month}`
      );
      const budgetData = await budgetRes.json();

      if (budgetData) {
        setTotalBudget(Number(budgetData.total_budget) || 0);
        setCategoryBudgets({
          Food: 0,
          Transport: 0,
          Groceries: 0,
          Shopping: 0,
          Bills: 0,
          Other: 0,
          ...budgetData.category_budgets,
        });
      }
    } catch (err) {
      console.error("Failed to load budget:", err);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        setUserEmail(user.email);
        fetchAndSetBudgetData(user.email);
      }
    });
    return () => unsubscribe();
  }, []);

  const saveBudget = (total: number, categories: Record<string, number>) => {
    if (!userEmail) return;

    const payload = {
      userEmail,
      month,
      total_budget: total,
      category_budgets: categories,
    };

    fetch("http://localhost:3001/api/budget", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch((err) => console.error("Error saving budget data:", err));
  };

  const handleBudgetSubmit = (
    type: "total" | "category",
    category: string,
    amount: number
  ) => {
    if (type === "total") {
      setTotalBudget(amount);
      saveBudget(amount, categoryBudgets);
    } else {
      setCategoryBudgets((prev) => {
        const updated = { ...prev, [category]: amount };
        saveBudget(totalBudget, updated);
        return updated;
      });
    }
  };

  const hasTotalBudget = totalBudget > 0;
  const hasCategoryBudgets = Object.values(categoryBudgets).some((val) => val > 0);

  return (
    <div>
      <h2>Budget Overview (This Month)</h2>

      {hasTotalBudget && (
        <div>
          <h3>Total Budget</h3>
          <p>
            You've spent <strong>${totalSpent.toFixed(2)}</strong> of your{" "}
            <strong>${totalBudget.toFixed(2)}</strong> budget (
            {Math.round((totalSpent / totalBudget) * 100)}%)
          </p>
        </div>
      )}

      {hasCategoryBudgets && (
        <>
          <h3>Category Budgets</h3>
          {Object.keys(categoryBudgets).map((cat) => {
            const spent = categorySpending[cat] || 0;
            const budget = categoryBudgets[cat];
            if (budget <= 0) return null;
            const percent = Math.round((spent / budget) * 100);
            return (
              <div key={cat}>
                <h4>
                  {cat}: Spent <strong>${spent.toFixed(2)}</strong> of{" "}
                  <strong>${budget.toFixed(2)}</strong> ({percent}%)
                </h4>
              </div>
            );
          })}
        </>
      )}

      <SetBudget
        totalBudget={totalBudget}
        categoryBudgets={categoryBudgets}
        onBudgetSubmit={handleBudgetSubmit}
      />
    </div>
  );
}

export default BudgetPage;
