import { useState, ChangeEvent, FormEvent } from "react";
import { Expense } from "../types";
import ExpenseComponent from "./ExpenseComponent";

interface ExpenseManagerProps {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
}

const ExpenseManager = ({ expenses, setExpenses }: ExpenseManagerProps) => {
  //storing current input
  const [expense, setExpense] = useState<Expense>({
      item: "",
      amount: "",
      date: "",
      note: "",
      receiptUrl: ""
  });
  
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
      note:""
      });
  };

  //deletes expense by its index
  const handleDelete = (indexToDelete: number) => {
      setExpenses((prev) => prev.filter((_, index) => index !== indexToDelete));
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onloadend = () => {
    setExpense(prev => ({
      ...prev,
      receiptUrl: reader.result as string
    }));
  };
  reader.readAsDataURL(file);
};

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
        <br />
        <label>Notes: </label>
        <input
          type="text"
          name="note"
          value={expense.note}
          onChange={handleChange}
        />
        <br />
        <label>Receipt: </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
        />
        <button type="submit">Add Expense</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Note</th>
            <th>Receipt</th>
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
    </div>
  );
};


export default ExpenseManager;

