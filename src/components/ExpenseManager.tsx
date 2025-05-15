// ExpenseManager.tsx
import { useState, ChangeEvent, FormEvent } from "react";
import { Expense } from "../types";
import ExpenseComponent from "./ExpenseComponent";

const ExpenseManager = () => {
  //storing current input
  const [expense, setExpense] = useState<Expense>({
      item: "",
      amount: "",
      date: "",
  });
  //storing the list of all expenses added
  const [expenses, setExpenses] = useState<Expense[]>([]);
  
  /*called when there is an input change 
  takes input's attributes and value*/
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      //updates expense state
      setExpense((prev) => ({
      ...prev,
      [name]: value,
      }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      //stop page from reloading
      e.preventDefault();

      //check if any inputs are empty 
      if (!expense.item || !expense.amount || !expense.date) return;

      setExpenses((prev) => [...prev, expense]);

      //reset expense to empty for next input
      setExpense({
      item: "",
      amount: "",
      date: "",
      });
  };

  //deletes expense by its index
  const handleDelete = (indexToDelete: number) => {
      setExpenses((prev) => prev.filter((_, index) => index !== indexToDelete));
  };

  function calculateTotal(expenses: Expense[]): number {
    return expenses.reduce((total, expense) => {
      return total + parseFloat(expense.amount);
    }, 0);
  }


  return (
    <div>
      <h2>Expenses</h2>
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
            <ExpenseComponent 
                key={index} 
                expense={exp} 
                onDelete={() => handleDelete(index)}
            />
          ))}
        </tbody>
      </table>
      <h2> Summary</h2>
      <p>Total spent: ${calculateTotal(expenses)}</p>

    </div>
  );
};

export default ExpenseManager;