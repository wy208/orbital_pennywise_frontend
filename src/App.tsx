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
      <div>
        <img src={logo} alt="logo" />
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/summary">Summary</Link>
          </li>
          <li>
            <Link to="/budget">Budget</Link>
          </li>
          <li>
            <Link to="/avatar">Avatar</Link>
          </li>
          <li><button onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<ExpensePage expenses={expenses} setExpenses={setExpenses} />} />
        <Route path="/summary" element={<SummaryPage expenses={expenses} />} />
        <Route path="/budget" element={<BudgetPage expenses={expenses} />} />
        <Route path="/avatar" element={<AvatarPage />} />
      </Routes>
    </Router>
  );
}

export default App;
