import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TransactionService} from "../transaction.service";
import {Transaction} from "../../model";

@Component({
  selector: 'app-add-transaction-form',
  templateUrl: './add-transaction-form.component.html',
  styleUrls: ['./add-transaction-form.component.scss']
})
export class AddTransactionFormComponent {

  transactionForm: FormGroup;

  todayDateFormatted = '';

  @Output() onSubmit = new EventEmitter<Transaction>();

  @Output() onClose = new EventEmitter<void>();

  constructor(
    private transactionService: TransactionService,
    private fb: FormBuilder
  ) {
    let todayDate = new Date();
    this.todayDateFormatted = todayDate.toISOString().split('T')[0];
    this.transactionForm = this.fb.group({
      transactionDate: [this.todayDateFormatted, Validators.required],
      amount: [null, [Validators.required, Validators.min(0)]],
      category: [null, Validators.required],
      description: [null]
    });
  }

  submitForm() {
    if(this.transactionForm.valid){
      this.onSubmit.emit(this.transactionForm.value);
      this.closeForm();
    }
  }

  closeForm() {
    this.onClose.emit();
    this.resetForm();
  }

  private resetForm() {
    this.transactionForm.reset();
    this.transactionForm.get('transactionDate')?.setValue(this.todayDateFormatted);
  }
}
