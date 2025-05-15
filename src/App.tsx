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
import ExpenseManager from "./components/ExpenseManager";




function App() {
  return (
    <div className="App">
      <h1>PennyWise</h1>
      <main>
        <ExpenseManager />
      </main>

    </div>
    
  );
}
 
export default App;

