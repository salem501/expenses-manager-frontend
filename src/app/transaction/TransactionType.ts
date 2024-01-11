export enum TransactionType {
  EXPENSE = 'EXPENSE',
  INCOME = 'INCOME'
}

export function convertStringToEnum(value: string): TransactionType {
  return TransactionType[value as keyof typeof TransactionType];
}
