import SummaryCalc from "./components/SummaryCalc"
import MonthlySpendingChart from './components/MonthlySpendingChart';
import { Expense } from "./types";

interface SummaryCalcProps {
  expenses: Expense[];
}

function SummaryPage ({ expenses }: SummaryCalcProps) {
    return (
      <div>
        <SummaryCalc 
            expenses={expenses} />
        <div>
          <MonthlySpendingChart expenses={expenses} />
        </div>
      </div>
    )
}

export default SummaryPage;