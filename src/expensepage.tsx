import { Expense } from "./types";
import ExpenseManager from "./components/ExpenseManager";

interface ExpenseManagerProps {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
}

function ExpensePage({ expenses, setExpenses }: ExpenseManagerProps) {
    return (
        <div className="App">
                <main>
                  <ExpenseManager 
                    expenses={expenses} 
                    setExpenses={setExpenses}/>
                </main>
        </div>
    )
}

export default ExpensePage;