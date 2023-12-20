import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Transaction} from "../model";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class TransactionService {

    private backendUrl = 'http://localhost:8080/api/transaction/';
    private userId = '5957a226-c5b0-40ea-b249-b9ead524f724'

    constructor(private http: HttpClient) {
    }

    getAllTransactions(): Observable<Transaction[]> {
        const endpoint = 'findAll/'
        const url = `${this.backendUrl}${endpoint}${(this.userId)}`;
        return this.http.get<Transaction[]>(url);
    }

    addTransaction(transaction: Transaction): Observable<Transaction> {
        const endpoint = 'add'
        const url = `${this.backendUrl}${endpoint}`;
        return this.http.post<Transaction>(url, {...transaction, userId: this.userId});
    }

    deleteTransaction(transactionId: string): Observable<Transaction> {
        const endpoint = 'delete/'
        const url = `${this.backendUrl}${endpoint}${transactionId}`;
        return this.http.delete<Transaction>(url);
    }
}
