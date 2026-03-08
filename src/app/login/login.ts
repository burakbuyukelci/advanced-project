import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart.service'; // Sepeti kontrol etmek için ekledik

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './login.html'
})
export class Login {
  // Başlangıçta Giriş Yap sekmesi açık olsun
  isLoginMode: boolean = true;

  constructor(
    private router: Router,
    private cartService: CartService // Servisi içeri aldık
  ) {}

  // Sekmeler (Giriş / Kayıt) arası geçiş fonksiyonu
  switchMode(mode: 'login' | 'register') {
    this.isLoginMode = (mode === 'login');
  }

  // GİRİŞ YAP BUTONUNA BASILINCA
  onLogin() {
    // Akıllı Yönlendirme: Sepette ürün var mı bakıyoruz
    const cartItems = this.cartService.getItems();

    if (cartItems.length > 0) {
      // Sepette ürün varsa, alışverişi tamamlaması için sepete at
      this.router.navigate(['/cart']);
    } else {
      // Sepet boşsa normal mağazaya yönlendir
      this.router.navigate(['/products']);
    }
  }

  // KAYIT OL BUTONUNA BASILINCA
  onRegister() {
    alert('Kayıt işlemi başarılı! Sisteme giriş yapıldı.');
    this.onLogin(); // Kayıt olunca da aynı akıllı yönlendirmeyi çalıştır
  }
}
