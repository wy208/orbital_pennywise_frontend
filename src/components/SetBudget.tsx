import React, { useState } from 'react';

function SetBudget() {
  const [budget, setBudget] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Budget set to: $${budget}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Set Your Budget:</label>
      <input
        type="number"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        placeholder="Enter amount"
      />
      <button type="submit">Save</button>
    </form>
  );
}

export default SetBudget;
