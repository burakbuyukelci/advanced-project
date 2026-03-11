import { Injectable } from '@angular/core';
import { CartItem } from './cart.service';

export interface Order {
  orderId: string;
  date: Date;
  total: number;
  status: string;
  items: CartItem[];
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[] = [];

  // Ödeme sayfasından sepeti alıp siparişe çevirir
  addOrder(items: CartItem[], total: number) {
    const newOrder: Order = {
      orderId: 'ORD-' + Math.floor(Math.random() * 900000 + 100000), // Rastgele sipariş kodu
      date: new Date(),
      total: total,
      status: 'Hazırlanıyor ⏳', // Başlangıç kargo statüsü
      items: [...items] // Sepetin kopyasını alıyoruz (referans kopmasın diye)
    };

    // Yeni siparişi listenin en başına ekle (En yeni en üstte)
    this.orders.unshift(newOrder);
  }

  getOrders() {
    return this.orders;
  }
}
