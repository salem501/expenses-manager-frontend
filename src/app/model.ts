import {TransactionType} from "./transaction/TransactionType";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface AuthenticationRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthenticationResponse {
  token: string;
}

export interface Transaction {
  id: string;
  userId?: string;
  transactionDate: string;
  category: string;
  amount: number;
  description?: string;
  type: TransactionType;
}

const months = new Map<number, string>([
  [1, 'January'],
  [2, 'February'],
  [3, 'March'],
  [4, 'April'],
  [5, 'May'],
  [6, 'June'],
  [7, 'July'],
  [8, 'August'],
  [9, 'September'],
  [10, 'October'],
  [11, 'November'],
  [12, 'December'],
]);
export default months;

