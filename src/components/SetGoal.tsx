import React, { useState } from 'react';

function SetGoal() {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [goals, setGoals] = useState<{ category: string; amount: string }[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !amount) {
      alert('Please enter both category and amount.');
      return;
    }

    setGoals([...goals, { category, amount }]);
    setCategory('');
    setAmount('');
  };

  return (
    <div>
      <h3>Create Goal</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Category:
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g. Entertaintment"
          />
        </label>
        <br />
        <label>
          Max Amount ($):
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 50"
          />
        </label>
        <br />
        <button type="submit">Save Goal</button>
      </form>

      <h4>Saved Goals:</h4>
      <ul>
        {goals.map((goal, index) => (
          <li key={index}>
            Max ${goal.amount} on {goal.category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SetGoal;
