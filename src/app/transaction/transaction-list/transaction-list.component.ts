import {Component, OnInit} from '@angular/core';
import {TransactionService} from "../transaction.service";
import {Transaction} from "../../model";

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {

  transactions: Transaction[] = [];

  groupedTransactions: Transaction[][] = [[]];

  showAddTransactionForm = false;

  showChangeTransactionForm = false;

  selectedTransaction: Transaction | undefined;

  constructor(
    private transactionService: TransactionService,
  ) {
  }

  ngOnInit(): void {
    this.fetchAllTransactions();
  }


  private fetchAllTransactions() {
    this.transactionService.getAllTransactions().subscribe(
      (transactions) => {
        this.transactions = transactions;
        transactions.sort((a: Transaction, b: Transaction) => {
          return a.transactionDate >= b.transactionDate ? 0 : 1;
        });
        this.groupTransactionsByDay();
      }
    );
  }

  updateTransaction(transaction: Transaction) {
    this.transactionService.updateTransaction(transaction.id, transaction).subscribe(() => {
      this.fetchAllTransactions();
    });
  }

  deleteTransaction(transactionId: string) {
    this.transactionService.deleteTransaction(transactionId).subscribe(() => {
      this.fetchAllTransactions();
    });
  }

  submitAddNewTransaction(transaction: Transaction) {
    if (transaction) {
      this.addNewTransaction(transaction);
      this.fetchAllTransactions();
    }
  }

  private addNewTransaction(transaction: Transaction) {
    this.transactionService.addTransaction(transaction).subscribe(
      () => {
        this.fetchAllTransactions();
      }
    );
  }

  closeAddNewTransactionForm() {
    this.showAddTransactionForm = false;
  }

  openAddNewTransactionForm() {
    this.showAddTransactionForm = true;
  }

  openChangeForm(transaction: Transaction) {
    this.selectedTransaction = transaction;
    this.showChangeTransactionForm = true;
  }

  closeChangeTransactionForm() {
    this.showChangeTransactionForm = false;
  }

  private groupTransactionsByDay() {
    if (this.transactions.length === 0) return;
    let transactionByDate: Map<string, Transaction[]> = new Map();
    this.transactions.forEach(transaction => {
      if (transactionByDate.has(transaction.transactionDate)) {
        transactionByDate.get(transaction.transactionDate)?.push(transaction);
      } else {
        transactionByDate.set(transaction.transactionDate, [transaction]);
      }
    });
    this.groupedTransactions = Array.from(transactionByDate.values());
  }
}
