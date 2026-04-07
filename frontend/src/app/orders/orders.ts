import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService, Order } from '../order.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './orders.html',
  styleUrl: './orders.css'
})
export class Orders implements OnInit {
  myOrders: Order[] = [];

  constructor(private orderService: OrderService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.orderService.getOrders().subscribe({
      next: (data) => {
        console.log('Siparişler geldi:', data);
        this.myOrders = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Siparişler alınamadı', err)
    });
  }
}
