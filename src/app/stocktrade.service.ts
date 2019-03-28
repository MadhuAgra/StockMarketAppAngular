import { Injectable } from '@angular/core';
import { User } from './user';
import { Stock } from './stock';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StockHolding } from './stockholding';

@Injectable({
  providedIn: 'root'
})
export class StocktradeService {

  user:User = new User();
  allStockDetails : Array<Stock>;
  userStocks:Array<StockHolding>;

  constructor(private _http: HttpClient) { }

  getUser(email: string, password: string): Observable<User> {
    return this._http.get<any>('http://localhost:55690/api/User/Login?email=' + encodeURIComponent(email) + '&password=' + encodeURIComponent(password));
  }

  registerUser(user: User) {
    return this._http.post('http://localhost:55690/api/User/RegisterUser', user);
  }

  checkExistingUser(email: string): Observable<User> {
    return this._http.get<any>('http://localhost:55690/api/User/CheckExistingUser?email=' + encodeURIComponent(email));
  }

  getAllStockDetails(): Observable<Array<Stock>> {
    return this._http.get<any>('http://localhost:55690/api/User/GetAllStockDetails');
  }

  getUserStock(id:number):Observable<Array<StockHolding>>{
    return this._http.get<any>('http://localhost:55690/api/User/GetUserStock?userId=' + id);
  }

  getSingleStockDetails(id:number):Observable<Stock>{
    return this._http.get<any>('http://localhost:55690/api/User/GetSingleStockDetails?stockId=' + id);
  }

  insertOrUpdateTransaction(transaction: StockHolding) {
    return this._http.post('http://localhost:55690/api/User/InsertOrUpdateTransaction', transaction);
  }

  updateUserDetails(id:number,cash: number, stock: number) {
    return this._http.get<any>('http://localhost:55690/api/User/UpdateUserDetails?userId=' + id + '&cashValue=' + cash + '&stockValue=' + stock);
  }

  decreaseQuantityTransaction(transaction: StockHolding) {
    return this._http.put<any>('http://localhost:55690/api/User/DecreaseQuantityTransaction', transaction);
  }

}
