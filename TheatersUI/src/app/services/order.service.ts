import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder } from '../models/order';
import { AppSettings } from '../settings/settings';
import { IAllOrderInfo } from '../models/all-order-info';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiHost = AppSettings.apiHost;
  constructor(private http: HttpClient) {}

  public addOrder(order: IOrder): Observable<IOrder> {
    return this.http.post<IOrder>(`${this.apiHost}/order`, order);
  }

  public getAllOrderOnfo(id: number): Observable<IAllOrderInfo> {
    return this.http.get<IAllOrderInfo>(`${this.apiHost}/order/${id}`);
  }
}
