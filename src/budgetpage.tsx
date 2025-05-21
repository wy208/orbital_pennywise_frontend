import React from 'react';
import SetBudget from './components/SetBudget';
import SetGoal from './components/SetGoal';

function BudgetPage() {
  return (
    <div>
      <h2>Budget set:</h2>
      <SetBudget />

      <h2>Goals and Challenges:</h2>
      <SetGoal />
    </div>
  );
}

export default BudgetPage;
