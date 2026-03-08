import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService, CartItem } from '../cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css' // CSS dosyamızı buraya bağladık!
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.updateCart();
  }

  updateCart() {
    this.cartItems = this.cartService.getItems();
    this.total = this.cartService.getCartTotal();
  }

  increase(productId: number) {
    this.cartService.increaseQuantity(productId);
    this.updateCart();
  }

  decrease(productId: number) {
    this.cartService.decreaseQuantity(productId);
    this.updateCart();
  }

  remove(productId: number) {
    this.cartService.removeFromCart(productId);
    this.updateCart();
  }
}
