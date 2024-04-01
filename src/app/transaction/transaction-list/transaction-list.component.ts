import {Component, OnInit} from '@angular/core';
import {TransactionService} from "../transaction.service";
import months, {Transaction} from "../../model";
import {library} from '@fortawesome/fontawesome-svg-core'
import {faCircleChevronLeft, faCircleChevronRight, faSliders} from "@fortawesome/free-solid-svg-icons";
import {AuthService} from "../../auth-service/auth.service";
import {TransactionType} from "../TransactionType";
import {faCreditCard} from "@fortawesome/free-solid-svg-icons/faCreditCard";
import {faHandHoldingDollar} from "@fortawesome/free-solid-svg-icons/faHandHoldingDollar";
import {faScaleBalanced} from "@fortawesome/free-solid-svg-icons/faScaleBalanced";

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

  private today = new Date();

  private year: number = this.today.getFullYear();

  private month: number = this.today.getMonth() + 1;

  constructor(
    private transactionService: TransactionService,
    private authService: AuthService
  ) {
    library.add(faCircleChevronRight, faCircleChevronLeft)
  }

  ngOnInit(): void {
    this.fetchTransactions();
  }

  getDateLabel() {
    return `${months.get(this.month)}, ${this.year}`;
  }

  goToNextMonth() {
    if (this.month == 12) {
      this.month = 1;
      this.year++;
    } else {
      this.month++;
    }
    this.fetchTransactions();
  }

  goToPreviousMonth() {
    if (this.month == 1) {
      this.month = 12;
      this.year--;
    } else {
      this.month--;
    }
    this.fetchTransactions();
  }

  private fetchTransactions() {
    this.transactionService.getTransactionsByYearAndMonth(this.year, this.month).subscribe(
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
      this.fetchTransactions();
    });
  }

  deleteTransaction(transactionId: string) {
    this.transactionService.deleteTransaction(transactionId).subscribe(() => {
      this.fetchTransactions();
    });
  }

  submitAddNewTransaction(transaction: Transaction) {
    if (transaction) {
      this.addNewTransaction(transaction);
      this.fetchTransactions();
    }
  }

  getTotalIncome() {
    return this.transactions.reduce((a: number, b: Transaction) => {
      if (b.type === TransactionType.INCOME) return a + b.amount;
      return a;
    }, 0);
  }

  getTotalExpenses() {
    return this.transactions.reduce((a: number, b: Transaction) => {
      if (b.type === TransactionType.EXPENSE) return a + b.amount;
      return a;
    }, 0);
  }

  getDifferenceIncomeAndExpenses() {
    return this.getTotalIncome() - this.getTotalExpenses();
  }

  private addNewTransaction(transaction: Transaction) {
    this.transactionService.addTransaction(transaction).subscribe(
      () => {
        this.fetchTransactions();
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

  protected readonly months = months;
  protected readonly faCircleChevronLeft = faCircleChevronLeft;
  protected readonly faCircleChevronRight = faCircleChevronRight;
  protected readonly TransactionType = TransactionType;
  protected readonly faSliders = faSliders;
  protected readonly faCreditCard = faCreditCard;
  protected readonly faHandHoldingDollar = faHandHoldingDollar;
  protected readonly faScaleBalanced = faScaleBalanced;
}
