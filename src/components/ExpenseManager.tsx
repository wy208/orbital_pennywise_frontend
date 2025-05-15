// ExpenseManager.tsx
import { useState, ChangeEvent, FormEvent } from "react";
import { Expense } from "../types";
import ExpenseComponent from "./ExpenseComponent";

const ExpenseManager = () => {
  const [expense, setExpense] = useState<Expense>({
    item: "",
    amount: "",
    date: "",
  });

  const [expenses, setExpenses] = useState<Expense[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setExpense((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!expense.item || !expense.amount || !expense.date) return;

    setExpenses((prev) => [...prev, expense]);

    setExpense({
      item: "",
      amount: "",
      date: "",
    });
  };

  return (
    <div>
      <h2>Expense Manager</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <label>Item: </label>
        <input
          type="text"
          name="item"
          value={expense.item}
          onChange={handleChange}
        />
        <br />
        <label>Amount: </label>
        <input
          type="number"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
        />
        <br />
        <label>Date: </label>
        <input
          type="date"
          name="date"
          value={expense.date}
          onChange={handleChange}
        />
        <button type="submit">Add Expense</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp, index) => (
            <ExpenseComponent key={index} expense={exp} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseManager;
