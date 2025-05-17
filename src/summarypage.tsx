import SummaryCalc from "./components/SummaryCalc"
import { Expense } from "./types";

interface SummaryCalcProps {
  expenses: Expense[];
}

function SummaryPage ({ expenses }: SummaryCalcProps) {
    return (
        <SummaryCalc 
            expenses={expenses} />
    )
}

export default SummaryPage;