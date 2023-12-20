export interface Transaction {
  id: string;
  userId?: string;
  transactionDate: string;
  category: string;
  amount: number;
  description?: string;
}
