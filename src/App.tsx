import "./App.css";
import { useState } from "react";
import { Expense } from "./types";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import ExpensePage from "./expensepage";
import SummaryPage from "./summarypage";
import BudgetPage from "./budgetpage";

import logo from "./images/pennywise_logo.png"

function App() {
  //storing the list of all expenses added
  const [expenses, setExpenses] = useState<Expense[]>([]);

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
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<ExpensePage 
          expenses={expenses} 
          setExpenses={setExpenses}/>} />
        <Route path="/summary" element={<SummaryPage
          expenses={expenses} />} />
        <Route path="/budget" element={<BudgetPage/> } />
      </Routes>      
    </Router>
  );
}
 
export default App;

