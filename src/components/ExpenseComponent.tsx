import { Expense } from "../types";

interface ExpenseProps {
  expense: Expense;
  onDelete: () => void; 
}

function ExpenseComponent( {expense, onDelete}: ExpenseProps) {
  return (
    <tr>
      <td>{expense.item}</td>
      <td>{expense.amount}</td>
      <td>{expense.date}</td>
      <td>
        <button onClick={onDelete}>Delete</button>
      </td>
    </tr>
  )
}

export default ExpenseComponent;
