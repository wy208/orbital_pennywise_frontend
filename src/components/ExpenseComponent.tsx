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
      <td>{expense.note || "-"}</td>
      <td>
        {expense.receiptUrl ? (
          <img src={expense.receiptUrl} alt="Receipt" width="80" />
        ) : "-"}
      </td>
      <td>
        <button onClick={onDelete}>Delete</button>
      </td>
      {/* <td>
        <button>Add Notes/Receipts</button>
      </td> */}
    </tr>
  )
}

export default ExpenseComponent;
