import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Goal } from "../types";
import GoalTable from "./GoalTable";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

interface GoalManagerProps {
  goals: Goal[];
  setGoals: React.Dispatch<React.SetStateAction<Goal[]>>;
}


const SetGoal = ({ goals, setGoals }: GoalManagerProps) => {

  const [goal, setGoal] = useState<Goal>({
    item: "",
    amount: "",
  });

  const [tableData, setTableData] = useState<Goal[]>([]);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (user && user.email) {
        try {
          const response = await axios.get(`http://localhost:3001/api/goals?email=${user.email}`);
          setTableData(response.data);
          setGoals(response.data);
        } catch (err) {
          console.error("Error fetching user goals:", err);
        }
      }
    });

    return () => unsubscribe();
  }, [setGoals]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setGoal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    if (!goal.item || !goal.amount) return;

    try {
      const user = getAuth().currentUser;
      const user_email = user?.email;

      if (!user_email) {
        console.error("No authenticated user.");
        return;
      }

      const newGoalWithUser = {
        ...goal,
        user_email: user_email
      };

      const response = await fetch("http://localhost:3001/api/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newGoalWithUser)
      });

      if (response.ok) {
        const updated = await fetch(`http://localhost:3001/api/goals?email=${user_email}`);
        const data = await updated.json();
        setGoals(data);
        setTableData(data);
      } else {
        console.error("POST failed:", await response.text());
      }
    } catch (err) {
      console.error("Error submitting:", err);
    }

    setGoal({
      item: "",
      amount: "",
    });
  };

  return (
    <div>
      <h2>Goal</h2>


      <form onSubmit={handleSubmit} autoComplete="off">
        <label>Item/Category: </label>
        <input type="text" name="item" value={goal.item} onChange={handleChange} />
        <br />

        <label>Amount needed ($): </label>
        <input type="number" name="amount" value={goal.amount} onChange={handleChange} />
        <br />

        <button type="submit">Add Expense</button>
      </form>

      <GoalTable tableData={tableData} setTableData={setTableData} />
    </div>
  );
};
export default SetGoal;