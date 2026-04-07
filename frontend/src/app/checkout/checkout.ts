import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CartService, CartItem } from '../cart.service';
import { OrderService } from '../order.service'; // SİPARİŞ SERVİSİNİ İÇERİ ALDIK

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;

  isProcessing: boolean = false;
  paymentSuccessful: boolean = false;

  checkoutData = { fullName: '', address: '', city: '', cardNumber: '', expiry: '', cvv: '' };

  // ORDER SERVİSİ CONSTRUCTOR'A EKLENDİ
  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartItems = this.cartService.getItems();
    this.total = this.cartService.getCartTotal();
    if (this.cartItems.length === 0) this.router.navigate(['/products']);
  }

  processPayment() {
    if(!this.checkoutData.fullName || !this.checkoutData.cardNumber || !this.checkoutData.address) {
        alert("Lütfen teslimat ve kart bilgilerinizi eksiksiz doldurun.");
        return;
    }

    this.isProcessing = true;

    // Önce siparişi backend'e gönder, sonra animasyonu göster
    const orderItems = this.cartItems.map(item => ({
      productId: item.product.id,
      quantity: item.quantity
    }));
    
    console.log('Sipariş gönderiliyor:', orderItems);

    this.orderService.addOrder(this.cartItems, this.total).subscribe({
      next: (res) => {
        console.log('Sipariş başarılı:', res);
        this.isProcessing = false;
        this.paymentSuccessful = true;
        this.cartService.clearCart();
        
        // 3 saniye sonra siparişlerim sayfasına yönlendir
        setTimeout(() => {
          this.router.navigate(['/orders']);
        }, 3000);
      },
      error: (err) => {
        console.error('Sipariş oluşturulamadı:', err);
        this.isProcessing = false;
        alert('Sipariş oluşturulurken bir hata oluştu: ' + (err.error?.message || 'Lütfen tekrar deneyin.'));
      }
    });
  }
}
