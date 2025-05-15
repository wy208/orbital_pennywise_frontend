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
import TaskManager from "./components/TaskManager";

function App() {
  return (
    <div className="App">
      <main>
        <TaskManager />
      </main>
    </div>
  );
}

export default App;

