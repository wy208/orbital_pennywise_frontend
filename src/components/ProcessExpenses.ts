import { Expense } from "../types";

export const getMonthlySpending = (expenses: Expense[]) => {
  const monthlyData: { [key: string]: number } = {};
  
  expenses.forEach(expense => {
    const date = new Date(expense.date);
    const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!monthlyData[monthYear]) {
      monthlyData[monthYear] = 0;
    }
    monthlyData[monthYear] += Number(expense.amount);
  });

  // Convert to array format for Recharts
  return Object.entries(monthlyData)
    .map(([month, total]) => ({
      month,
      total: parseFloat(total.toFixed(2))
    }))
    .sort((a, b) => a.month.localeCompare(b.month));
};

export default getMonthlySpending;