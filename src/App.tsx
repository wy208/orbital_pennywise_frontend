/*import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return(
    <div>
      <h2>Add Expense</h2>
      <div>
          <p>Item: </p>
          <input type="text" />
          <p>Amount: </p>
          <input type="text" />
          <p>Date: </p>
          <input type="text" />
          <button>Add</button>
      </div>
      
    </div>
  );
}

export default App;*/

import "./App.css";
import { useState } from "react";
import { Expense } from "./types";
import ExpenseManager from "./components/ExpenseManager";
import SummaryCalc from "./components/SummaryCalc"
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import ExpensePage from "./expensepage";
import SummaryPage from "./summarypage";

import logo from "./images/pennywise_logo.png"


function About() {
  return <h2>About Page</h2>;
}

function App() {
  //storing the list of all expenses added
  const [expenses, setExpenses] = useState<Expense[]>([]);

  return (
    <Router>
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
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<ExpensePage 
          expenses={expenses} 
          setExpenses={setExpenses}/>} />
        <Route path="/summary" element={<SummaryPage
          expenses={expenses} />} />
      </Routes>
    
      {/* <div className="App">
        <h1>PennyWise</h1>
        <main>
          <ExpenseManager 
            expenses={expenses} 
            setExpenses={setExpenses}/>
        </main>
        <SummaryCalc 
            expenses={expenses} />

      </div> */}
      
    </Router>
    
  );
}
 
export default App;

