import { PieChart, Pie, Tooltip, Cell } from 'recharts';

interface BudgetStatusProps {
  budget: number | null;
  totalSpending: number;
}

function BudgetStatus({ budget, totalSpending }: BudgetStatusProps) {
  if (!budget) {
    return <div>No budget set</div>;
  }

  const percentageUsed = (totalSpending / budget) * 100;
  let statusMessage = '';

  if (totalSpending > budget) {
    statusMessage = 'Budget exceeded!';
  } else if (percentageUsed >= 95) {
    statusMessage = '95% used!';
  } else if (percentageUsed >= 90) {
    statusMessage = '90% used!';
  } else if (percentageUsed >= 80) {
    statusMessage = '80% used!';
  } else {
    statusMessage = 'Saving well!';
  }

  const budgetData = [
    { name: 'Budget', value: budget },
    { name: 'Spent', value: totalSpending }
  ];

  return (
    <div className={`budget-status`}>
      <h3>Budget Status</h3>
      <p>{statusMessage}</p>
      <PieChart width={600} height={250}>
          <Pie
            data={budgetData}
            cx="50%"
            cy="50%"
            labelLine={true}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            <Cell fill="#0088FE" />  
            <Cell fill="#00C49F" />
            {budgetData.map((entry, index) => (
              <Cell key={`cell-${index}`}  />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      <p>${totalSpending.toFixed(2)} of ${budget.toFixed(2)} used</p>
      <p>({Math.round(percentageUsed)}%)</p>
    </div>
  );
}

export default BudgetStatus;