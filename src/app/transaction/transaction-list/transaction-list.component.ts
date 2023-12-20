import {Component, OnInit} from '@angular/core';
import {TransactionService} from "../transaction.service";
import {Transaction} from "../../model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'app-transaction-list',
    templateUrl: './transaction-list.component.html',
    styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {

    transactions: Transaction[] = [];

    newTransactionForm: FormGroup;

    showAddTransactionForm = false

    todayDateFormatted = '';


    constructor(
        private transactionService: TransactionService,
        private fb: FormBuilder,
        private library: FaIconLibrary
    ) {
        let todayDate = new Date();
        this.todayDateFormatted = todayDate.toISOString().split('T')[0];
        this.newTransactionForm = this.fb.group({
            transactionDate: [this.todayDateFormatted, Validators.required],
            amount: [null, [Validators.required, Validators.min(0)]],
            category: [null, Validators.required],
            description: [null]
        });
        library.addIcons(faTrashCan);
    }

    ngOnInit(): void {
        this.fetchAllTransactions();
    }

    private fetchAllTransactions() {
        this.transactionService.getAllTransactions().subscribe(
            (transactions) => {
                this.transactions = transactions;
            }
        );
    }

    deleteTransaction(transactionId: string) {
        this.transactionService.deleteTransaction(transactionId).subscribe(() => {
            this.fetchAllTransactions();
        });
    }

    submitForm() {
        if (this.newTransactionForm.valid) {
            const formData = this.newTransactionForm.value;
            this.addNewTransaction(formData);
        }
    }

    private addNewTransaction(transaction: Transaction) {
        this.transactionService.addTransaction(transaction).subscribe(
            () => {
                this.fetchAllTransactions();
                this.resetForm();
                this.toggleModal();
            }
        );
    }

    private resetForm() {
        this.newTransactionForm.reset();
        this.newTransactionForm.get('transactionDate')?.setValue(this.todayDateFormatted);
    }

    toggleModal() {
        this.showAddTransactionForm = !this.showAddTransactionForm;
    }

  protected readonly faTrashCan = faTrashCan;
}
