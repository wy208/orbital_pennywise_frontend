export interface Expense {
  item: string;
  amount: string;
  date: string;
  notes?: string;
  receipt_url?: string; 
  category: string;
  id?: number;
  user_email?: string;
}

export interface Goal {
  item: string;
  amount: string;
  id?: number;
  user_email?: string;
}