import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TransactionService} from "../transaction.service";
import {Transaction} from "../../model";

@Component({
  selector: 'app-change-transaction-form [transaction]',
  templateUrl: './change-transaction-form.component.html',
  styleUrls: ['./change-transaction-form.component.scss']
})
export class ChangeTransactionFormComponent implements OnInit {

  showChangeTransactionModal: boolean = false;

  transactionForm: FormGroup;

  @Input() transaction!: Transaction;

  @Output() onSave = new EventEmitter<Transaction>

  @Output() onDelete = new EventEmitter<string>

  @Output() onClose = new EventEmitter<void>

  constructor(
    private transactionService: TransactionService,
    private fb: FormBuilder
  ) {
    this.transactionForm = this.fb.group({
      transactionDate: [null, Validators.required],
      amount: [null, [Validators.required, Validators.min(0)]],
      category: [null, Validators.required],
      description: [null]
    });
  }

  ngOnInit(): void {
    this.loadValues();
  }

  private loadValues() {
    this.transactionForm.get('transactionDate')?.setValue(this.transaction.transactionDate);
    this.transactionForm.get('amount')?.setValue(this.transaction.amount);
    this.transactionForm.get('category')?.setValue(this.transaction.category);
    this.transactionForm.get('description')?.setValue(this.transaction.description);

  }

  closeForm() {
    this.onClose.emit();
  }

  save() {
    if(this.transactionForm.valid){
      this.onSave.emit({...this.transactionForm.value, id: this.transaction.id});
      this.closeForm();
    }
  }

  delete() {
    this.onDelete.emit(this.transaction.id);
    this.closeForm();
  }
}
