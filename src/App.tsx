import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Expense } from "./types";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { onAuthStateChanged, signOut, getAuth } from "firebase/auth";
import { auth } from "./components/Firebase";

import ExpensePage from "./expensepage";
import SummaryPage from "./summarypage";
import BudgetPage from "./budgetpage";
import AuthPage from "./components/AuthPage";

import logo from "./images/pennywise_logo.png";

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    const user = getAuth().currentUser;
    const today = new Date().toISOString().slice(0, 10);
    if (user) {
      axios.post('${process.env.REACT_APP_API_URL}/api/login-reward', {
        email: user.email,
        date: today,
      });
    }

    return unsubscribe;
  }, []);

  const handleLogout = () => {
    signOut(auth);
  };

  if (!user) {
    return <AuthPage onAuthSuccess={() => { }} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-purple-100 text-gray-900">
        <header className="p-4 flex items-center justify-between">
          <img src={logo} alt="logo" className="h-12" />
        </header>

        {/* ✅ Styled Navigation Bar */}
        <nav className="flex flex-wrap gap-3 px-4 py-3">
          {[
            { to: "/", label: "Home" },
            { to: "/summary", label: "Summary" },
            { to: "/budget", label: "Budget" },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="border border-purple-300 rounded px-4 py-2 bg-white text-purple-700 hover:bg-purple-200 font-medium shadow-sm"
            >
              {link.label}
            </Link>
          ))}

          <button
            onClick={handleLogout}
            className="border border-purple-300 rounded px-4 py-2 bg-white text-purple-700 hover:bg-purple-200 font-medium shadow-sm"
          >
            Logout
          </button>
        </nav>

        <main className="px-4 py-6">
          <Routes>
            <Route path="/" element={<ExpensePage expenses={expenses} setExpenses={setExpenses} />} />
            <Route path="/summary" element={<SummaryPage expenses={expenses} />} />
            <Route path="/budget" element={<BudgetPage expenses={expenses} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
