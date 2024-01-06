import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Transaction} from "../model";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth-service/auth.service";

@Injectable({
    providedIn: 'root'
})
export class TransactionService {

    private backendUrl = 'http://localhost:8080/transaction/';

    constructor(private http: HttpClient,
                private authService: AuthService) {
    }

    getTransactionsByYearAndMonth(year: number, month: number): Observable<Transaction[]> {
        const endpoint = 'getByYearAndMonth/'
        const url = `${this.backendUrl}${endpoint}${this.authService.userId}/${year}/${month}`;
        return this.http.get<Transaction[]>(url);
    }

    addTransaction(transaction: Transaction): Observable<Transaction> {
        const endpoint = 'add'
        const url = `${this.backendUrl}${endpoint}`;
        return this.http.post<Transaction>(url, {...transaction, userId: this.authService.userId});
    }

    deleteTransaction(transactionId: string): Observable<Transaction> {
        const endpoint = 'delete/'
        const url = `${this.backendUrl}${endpoint}${transactionId}`;
        return this.http.delete<Transaction>(url);
    }

  updateTransaction(id: string, transaction: Transaction): Observable<Transaction> {
    const endpoint = 'update/'
    const url = `${this.backendUrl}${endpoint}${id}`;
    console.log(url);
    return this.http.put<Transaction>(url, transaction);
  }
}
