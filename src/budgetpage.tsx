import { useEffect, useState } from "react";
import SetBudget from "./components/SetBudget";
import SetGoal from "./components/SetGoal";
import { Expense } from "./types";
import { Goal } from "./types";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";

interface GoalPageProps {
  goals: Goal[];
  setGoals: React.Dispatch<React.SetStateAction<Goal[]>>;
  expenses: Expense[];
}

function BudgetPage({ expenses, goals, setGoals }: GoalPageProps) {
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

  useEffect(() => {
    const user = getAuth().currentUser;
    if (!user) return;

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const currentMonth = `${year}-${month}`;

    const lastMonthDate = new Date();
    lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
    const lastYear = lastMonthDate.getFullYear();
    const lastMonth = String(lastMonthDate.getMonth() + 1).padStart(2, '0');
    const previousMonth = `${lastYear}-${lastMonth}`;

    // 🔹 Filter and calculate monthly totals
    const totalSpentThisMonth = expenses
      .filter(exp => exp.date.slice(0, 7) === currentMonth)
      .reduce((sum, exp) => sum + parseFloat(exp.amount), 0);

    const totalSpentLastMonth = expenses
      .filter(exp => exp.date.slice(0, 7) === previousMonth)
      .reduce((sum, exp) => sum + parseFloat(exp.amount), 0);

    // 🔹 Payloads
    const goalPayload = {
      email: user.email,
      month: currentMonth,
      totalSpent: totalSpentThisMonth,
      budget: totalBudget,
    };

    const comparePayload = {
      email: user.email,
      month: currentMonth,
      thisMonthSpent: totalSpentThisMonth,
      lastMonthSpent: totalSpentLastMonth,
    };

    // 🔹 Send reward requests
    axios.post("http://localhost:3001/api/goal-reward", goalPayload)
      .catch(err => console.error("Goal reward error:", err));

    axios.post("http://localhost:3001/api/compare-reward", comparePayload)
      .catch(err => console.error("Compare reward error:", err));
  }, [expenses, totalBudget]);

  // Get user email on auth state change
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        setUserEmail(user.email);
        console.log("Authenticated user:", user.email);
      }else {
      console.log("No user logged in");
    }
    });
    return () => unsubscribe();
  }, []);

  // Calculate spending for current month
  const categorySpending: Record<string, number> = {};
  let totalSpent = 0;

  expenses
    .filter((exp) => exp.date.slice(0, 7) === month)
    .forEach((exp) => {
      const category = exp.category;
      const amount = parseFloat(exp.amount);
      if (category) {
        categorySpending[category] = (categorySpending[category] || 0) + amount;
      }
      totalSpent += amount;
    });

  // Save full budget (total + all categories) to backend
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

  // Fetch budget and goals from backend when userEmail or month changes
  useEffect(() => {
    if (!userEmail) return;

    const fetchData = async () => {
      try {
        const budgetRes = await fetch(
          `http://localhost:3001/api/budget?userEmail=${userEmail}&month=${month}`
        );
        const budgetData = await budgetRes.json();
        if (budgetData) {
          setTotalBudget(Number(budgetData.total_budget) || 0);

          // Merge with default categories to keep all categories defined
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

        const goalRes = await fetch(
          `http://localhost:3001/api/goals?email=${userEmail}&month=${month}`
        );
        const goalData = await goalRes.json();
        if (Array.isArray(goalData)) {
          setGoals(goalData);
        }
      } catch (err) {
        console.error("Failed to load data:", err);
      }
    };

    fetchData();
  }, [userEmail, month, setGoals]);

  // Handle budget updates from SetBudget component
  const handleBudgetSubmit = (
  type: "total" | "category",
  category: string,
  amount: number
) => {
  if (type === "total") {
    setTotalBudget(amount);
    saveBudget(amount, categoryBudgets); // ⚠️ Using current categoryBudgets here
  } else {
    setCategoryBudgets((prev) => {
      const updatedCategories = { ...prev, [category]: amount };
      saveBudget(totalBudget, updatedCategories); // ✅ Correctly merged
      return updatedCategories;
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

      <h3>Goals and Challenges</h3>
      <SetGoal goals={goals} setGoals={setGoals} />
    </div>
  );
}

export default BudgetPage;
