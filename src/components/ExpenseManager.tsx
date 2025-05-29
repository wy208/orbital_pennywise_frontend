// import { useState, ChangeEvent, FormEvent, useEffect } from "react";
// import { Expense } from "../types";
// import ExpenseTable from "./ExpenseTable";

// import axios from 'axios';

// interface ExpenseManagerProps {
//   expenses: Expense[];
//   setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
// }

// const ExpenseManager = ({ expenses, setExpenses }: ExpenseManagerProps) => {
//   const [tableData, setTableData] = useState([]);
//   // const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/api/expenses');
//         setTableData(response.data);
//       } catch (err) {
//         console.log('Error', err);
//       }
//     }
//     fetchData();
//   })

  

//   const [expense, setExpense] = useState<Expense>({
//     item: "",
//     amount: "",
//     date: "",
//     notes: "",
//     receipt_url: "",
//     category: "", 
//   });

//   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setExpense((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//   //   e.preventDefault();
//   //   if (!expense.item || !expense.amount || !expense.date) return;

//   //   setExpenses((prev) => [...prev, expense]);

//   //   setExpense({
//   //     item: "",
//   //     amount: "",
//   //     date: "",
//   //     notes: "",
//   //     receipt_url: "",
//   //     category: "",
//   //   });
//   // };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//   e.preventDefault();

//   if (!expense.item || !expense.amount || !expense.date || !expense.category) return;

//   try {
//     const response = await  fetch("http://localhost:3001/api/expenses", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(expense)
//     });

//     if (response.ok) {
//       const updated = await fetch("http://localhost:3001/api/expenses");
//       const data = await updated.json();
//       setExpenses(data); // Update the table display
//     } else {
//       console.error("POST failed:", await response.text());
//     }
//   } catch (err) {
//     console.error("Error submitting:", err);
//   }

//   setExpense({
//     item: "",
//     amount: "",
//     date: "",
//     notes: "",
//     category: "",
//     receipt_url: ""
//   });
// };


//   const handleDelete = (indexToDelete: number) => {
//     setExpenses((prev) => prev.filter((_, index) => index !== indexToDelete));
//   };

//   const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setExpense((prev) => ({
//         ...prev,
//         receipt_url: reader.result as string,
//       }));
//     };
//     reader.readAsDataURL(file);
//   };

//   return (
//     <div>
//       <h2>Expenses</h2>
//       <form onSubmit={handleSubmit} autoComplete="off">
//         <label>Item: </label>
//         <input type="text" name="item" value={expense.item} onChange={handleChange} />
//         <br />

//         <label>Amount: </label>
//         <input type="number" name="amount" value={expense.amount} onChange={handleChange} />
//         <br />

//         <label>Date: </label>
//         <input type="date" name="date" value={expense.date} onChange={handleChange} />
//         <br />

//         <label>Category: </label> 
//         <select name="category" value={expense.category} onChange={handleChange}>
//           <option value="">Select a category</option>
//           <option value="Food">Food</option>
//           <option value="Transport">Transport</option>
//           <option value="Groceries">Groceries</option>
//           <option value="Shopping">Shopping</option>
//           <option value="Bills">Bills</option>
//           <option value="Other">Other</option>
//         </select>
//         <br />

//         <label>notes: </label>
//         <input type="text" name="notes" value={expense.notes} onChange={handleChange} />
//         <br />

//         <label>Receipt: </label>
//         <input type="file" accept="image/*" onChange={handleFileUpload} />
//         <button type="submit">Add Expense</button>
//       </form>

//       <table>
//         <thead>
//           <tr>
//             <th>Item</th>
//             <th>Amount</th>
//             <th>Date</th>
//             <th>Category</th>
//             <th>notes</th>
//             <th>Receipt</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tableData.map((exp, index) => (
//             <ExpenseTable tableData={tableData} setTableData={setTableData} />
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ExpenseManager;

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Expense } from "../types";
import ExpenseTable from "./ExpenseTable"; // Make sure this path is correct
import { useRef } from "react";


interface ExpenseManagerProps {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
}

const ExpenseManager = ({ expenses, setExpenses }: ExpenseManagerProps) => {
  const [expense, setExpense] = useState<Expense>({
    item: "",
    amount: "",
    date: "",
    notes: "",
    receipt_url: "",
    category: ""
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [tableData, setTableData] = useState<Expense[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/expenses");
        setTableData(response.data);
        setExpenses(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [setExpenses]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setExpense((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setExpense((prev) => ({
        ...prev,
        receipt_url: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!expense.item || !expense.amount || !expense.date || !expense.category) return;

    try {
      const response = await fetch("http://localhost:3001/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(expense)
      });

      if (response.ok) {
        const updated = await fetch("http://localhost:3001/api/expenses");
        const data = await updated.json();
        setExpenses(data);
        setTableData(data);
      } else {
        console.error("POST failed:", await response.text());
      }
    } catch (err) {
      console.error("Error submitting:", err);
    }

    setExpense({
      item: "",
      amount: "",
      date: "",
      notes: "",
      receipt_url: "",
      category: ""
    });
    
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
}
  };

  return (
    <div className="expense-manager">
      <h2>Expenses</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <label>Item: </label>
        <input type="text" name="item" value={expense.item} onChange={handleChange} />
        <br />

        <label>Amount: </label>
        <input type="number" name="amount" value={expense.amount} onChange={handleChange} />
        <br />

        <label>Date: </label>
        <input type="date" name="date" value={expense.date} onChange={handleChange} />
        <br />

        <label>Category: </label>
        <select name="category" value={expense.category} onChange={handleChange}>
          <option value="">Select a category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Groceries">Groceries</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
          <option value="Other">Other</option>
        </select>
        <br />

        <label>Notes: </label>
        <input type="text" name="notes" value={expense.notes} onChange={handleChange} />
        <br />

        <label>Receipt: </label>
        <input type="file"  onChange={handleFileUpload} ref={fileInputRef} accept="image/*" />
        <br />

        <button type="submit">Add Expense</button>
      </form>

      <ExpenseTable tableData={tableData} setTableData={setTableData} />
    </div>
  );
};

export default ExpenseManager;
