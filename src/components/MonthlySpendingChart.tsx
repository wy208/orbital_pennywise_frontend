import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getMonthlySpending } from "./ProcessExpenses"
import { Expense } from "../types";

interface MonthlySpendingChartProps {
  expenses: Expense[];
}

const MonthlySpendingChart = ({ expenses }: MonthlySpendingChartProps) => {
  const monthlyData = getMonthlySpending(expenses);

  return (
    <div className="chart-container" style={{ height: '400px' }}>
      <h3>Monthly Spending Trend</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={monthlyData}
          margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="month" 
            angle={-45}
            textAnchor="end"
            height={60}
            tickFormatter={(month) => {
              const [year, monthNum] = month.split('-');
              return new Date(parseInt(year), parseInt(monthNum) - 1).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
            }}
          />
          <YAxis 
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip 
            formatter={(value) => [`$${value}`, 'Total Spending']}
            labelFormatter={(month) => {
              const [year, monthNum] = month.split('-');
              return new Date(parseInt(year), parseInt(monthNum) - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#8884d8"
            strokeWidth={2}
            activeDot={{ r: 8 }}
            name="Total Spending"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlySpendingChart;