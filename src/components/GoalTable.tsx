import axios from "axios";
import { useState } from "react";
import { Goal } from "../types";

interface GoalTableProps {
  tableData: Goal[];
  setTableData: React.Dispatch<React.SetStateAction<Goal[]>>;
}

const GoalTable = ({ tableData, setTableData }: GoalTableProps) => {
  const [error, setError] = useState<string | null>(null);
  const baseUrl = process.env.REACT_APP_API_URL;

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Delete this goal?");
    if (confirmDelete && baseUrl) {
      try {
<<<<<<< HEAD
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/goals/${id}`);
=======
        await axios.delete(`${baseUrl}/api/goals/${id}`);
>>>>>>> 858d5d5eac630024cb24272e08521982d0b75c23
        setTableData(prev => prev.filter(goa => goa.id !== id));
      } catch (err: any) {
        setError(err.message || "Failed to delete goal.");
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
              <th>Delete?</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((goa) => (
              goa.id !== undefined && (
                <tr key={goa.id}>
                  <td>{goa.item}</td>
                  <td>${goa.amount}</td>
                  <td>
                    <button
                      className="btn btn-error"
                      onClick={() => handleDelete(goa.id!)}
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

export default GoalTable;
