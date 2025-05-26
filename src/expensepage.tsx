import { Expense } from "./types";
import ExpenseManager from "./components/ExpenseManager";

interface ExpensePageProps {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  budget: number | null; // ✅ Add this line
}

function ExpensePage({ expenses, setExpenses, budget }: ExpensePageProps) {
  return (
    <div className="App">
      <main>
        <ExpenseManager 
          expenses={expenses} 
          setExpenses={setExpenses}
          budget={budget}
        />
      </main>
    </div>
  );
}

export default ExpensePage;
