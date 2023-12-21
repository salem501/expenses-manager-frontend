import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { AddTransactionFormComponent } from './add-transaction-form/add-transaction-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {AppModule} from "../app.module";
import { ChangeTransactionFormComponent } from './change-transaction-form/change-transaction-form.component';



@NgModule({
  declarations: [
    TransactionListComponent,
    AddTransactionFormComponent,
    ChangeTransactionFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class TransactionModule { }
