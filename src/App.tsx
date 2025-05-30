import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./components/Firebase";

import { Expense } from "./types";

import ExpensePage from "./expensepage";
import SummaryPage from "./summarypage";
import BudgetPage from "./budgetpage";
import AuthPage from "./components/AuthPage";

import logo from "./images/pennywise_logo.png";

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // ✅ Changed from single budget to per-category budgets
  const [budgets, setBudgets] = useState<Record<string, number>>({});

  const [user, setUser] = useState<any>(null);

  // ✅ New budget update handler for category-based budgets
  const handleBudgetChange = (category: string, amount: number) => {
    setBudgets((prev) => ({
      ...prev,
      [category]: amount,
    }));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const handleLogout = () => {
    signOut(auth);
  };

  if (!user) {
    return <AuthPage onAuthSuccess={() => {}} />;
  }

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div>
        <img src={logo} alt="logo" />
      </div>

      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/summary">Summary</Link></li>
          <li><Link to="/budget">Budget and Challenges</Link></li>
          <li><button onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>

      <Routes>
        <Route
          path="/"
          element={<ExpensePage expenses={expenses} setExpenses={setExpenses} />}
        />
        <Route
          path="/summary"
          element={<SummaryPage expenses={expenses} />}
        />
        <Route
          path="/budget"
          element={
            <BudgetPage
              budgets={budgets}
              onBudgetChange={handleBudgetChange}
              expenses={expenses}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;