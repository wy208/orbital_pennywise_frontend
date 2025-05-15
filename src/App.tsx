import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return(
    <div>
      <h2 className='title'>PennyWise</h2>
      <div>
        <input type="text" placeholder='Username'/>
        <input type="text" placeholder='Password'/>
      </div>
      <div className='button'>
        <button>Log In</button>
        <button>Sign Up</button>
      </div>
    </div>
  );
}

export default App;
