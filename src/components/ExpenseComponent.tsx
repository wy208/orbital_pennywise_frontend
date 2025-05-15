import { Expense } from "../types";

interface ExpenseProps {
  expense: Expense
}

function ExpenseComponent( {expense}: ExpenseProps) {
  return (
    <tr>
      <td>{expense.item}</td>
      <td>{expense.amount}</td>
      <td>{expense.date}</td>
    </tr>
  )
}

export default ExpenseComponent;