import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {TransactionListComponent} from "./transaction/transaction-list/transaction-list.component";

export type MenuRoute = Route & {
  label: string;
}

export const routes: MenuRoute[] = [
  {
    label: 'Transactions',
    path: 'transactions',
    component: TransactionListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
