import axios from "axios";
import { useState } from "react";
import { Expense } from "../types";

interface ExpenseTableProps {
  tableData: Expense[];
  setTableData: React.Dispatch<React.SetStateAction<Expense[]>>;
}

const ExpenseTable = ({ tableData, setTableData }: ExpenseTableProps) => {
  const [error, setError] = useState<string | null>(null);
  const baseUrl = process.env.REACT_APP_API_URL;

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Delete this expense?");
    if (confirmDelete && baseUrl) {
      try {
        await axios.delete(`${baseUrl}/api/expenses/${id}`);
        setTableData(prev => prev.filter(exp => exp.id !== id));
      } catch (err: any) {
        setError(err.message || "Failed to delete expense.");
      }
    }
  };

  return (
    <>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Category</th>
              <th>Notes</th>
              <th>Receipt</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((exp) => (
              exp.id !== undefined && (
                <tr key={exp.id}>
                  <td>{exp.item}</td>
                  <td>${exp.amount}</td>
                  <td>{new Date(exp.date).toISOString().slice(0,10)}</td>
                  <td>{exp.category}</td>
                  <td>{exp.notes || "-"}</td>
                  <td>
                    {exp.receipt_url ? (
                      <img src={exp.receipt_url} alt="Receipt" width="80" />
                    ) : "-"}
                  </td>
                  <td>
                    <button
                      className="btn btn-error"
                      onClick={() => handleDelete(exp.id!)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ExpenseTable;
