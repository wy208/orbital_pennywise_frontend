import "./App.css";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Expense } from "./types";
import { Goal } from "./types";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { onAuthStateChanged, signOut, getAuth } from "firebase/auth";
import { auth } from "./components/Firebase";

import ExpensePage from "./expensepage";
import SummaryPage from "./summarypage";
import BudgetPage from "./budgetpage";
import AvatarPage from "./avatarpage";
import AuthPage from "./components/AuthPage";

import logo from "./images/pennywise_logo.png"

function App() {
  //storing the list of all expenses added
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);

  // for budgeting
  const [totalBudget, setTotalBudget] = useState<number>(0);
  const [categoryBudgets, setCategoryBudgets] = useState<Record<string, number>>({
    Food: 0,
    Transport: 0,
    Groceries: 0,
    Shopping: 0,
    Bills: 0,
    Other: 0,
  });

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    
    const user = getAuth().currentUser;
    const today = new Date().toISOString().slice(0, 10);
    if (!user) return;

    axios.post("http://localhost:3001/api/login-reward", {
      email: user.email,
      date: today,
    });
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
            <Link to="/budget">Budget and Challenges</Link>
          </li>
          <li>
            <Link to="/avatar">Avatar</Link>
          </li>
          <li><button onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={
          <ExpensePage expenses={expenses} setExpenses={setExpenses} />} />
        <Route path="/summary" element={
          <SummaryPage
            expenses={expenses} />} />
        <Route path="/budget" element={
          <BudgetPage
            expenses={expenses}
            goals={goals}
            setGoals={setGoals} />} />
        <Route path="/avatar" element={
          <AvatarPage />} />
      </Routes>
    </Router >

  );
}

export default App;