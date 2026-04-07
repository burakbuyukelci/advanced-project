import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem } from './cart.service';
import { environment } from '../environments/environment';

export interface Order {
  id?: number;
  orderId: string;
  date: Date;
  total: number;
  totalAmount: number;
  status: string;
  items: any[];
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) {}

  addOrder(items: CartItem[], total: number): Observable<any> {
    const request = {
      paymentMethod: 'Credit Card',
      items: items.map(i => ({ productId: i.product.id, quantity: i.quantity }))
    };
    return this.http.post<any>(`${environment.apiUrl}/orders`, request);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<any>(`${environment.apiUrl}/orders`).pipe(
      map(res => {
        if (res.success && res.data) {
          return res.data.map((o: any) => ({
            id: o.id,
            orderId: o.orderNumber,
            date: new Date(o.orderDate),
            total: o.totalAmount,
            totalAmount: o.totalAmount,
            status: o.status,
            items: o.items || []
          }));
        }
        return [];
      })
    );
  }
}
