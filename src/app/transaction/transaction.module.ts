import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionListComponent } from './transaction-list/transaction-list.component';



@NgModule({
  declarations: [
    TransactionListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TransactionModule { }
