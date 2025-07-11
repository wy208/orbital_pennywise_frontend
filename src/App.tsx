import "./App.css";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Expense } from "./types";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { onAuthStateChanged, signOut, getAuth } from "firebase/auth";
import { auth } from "./components/Firebase";

import ExpensePage from "./expensepage";
import SummaryPage from "./summarypage";
import BudgetPage from "./budgetpage";
import AvatarPage from "./avatarpage";
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
      axios.post("http://localhost:3001/api/login-reward", {
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
    <Router basename={process.env.PUBLIC_URL}>
      <div className="min-h-screen bg-purple-100 text-gray-900">
        <header className="p-4 flex items-center justify-between">
          <img src={logo} alt="logo" className="h-12" />
        </header>

        <nav className="px-4">
          <ul className="flex gap-4">
            <li><Link to="/" className="text-purple-700 hover:underline">Home</Link></li>
            <li><Link to="/summary" className="text-purple-700 hover:underline">Summary</Link></li>
            <li><Link to="/budget" className="text-purple-700 hover:underline">Budget</Link></li>
            <li><Link to="/avatar" className="text-purple-700 hover:underline">Avatar</Link></li>
            <li><button onClick={handleLogout} className="text-purple-700 underline">Logout</button></li>
          </ul>
        </nav>

        <main className="px-4 py-6">
          <Routes>
            <Route path="/" element={<ExpensePage expenses={expenses} setExpenses={setExpenses} />} />
            <Route path="/summary" element={<SummaryPage expenses={expenses} />} />
            <Route path="/budget" element={<BudgetPage expenses={expenses} />} />
            <Route path="/avatar" element={<AvatarPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
