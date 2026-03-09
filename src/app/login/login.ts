import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterModule], // RouterModule çok önemli!
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  // Form verileri
  loginData = {
    email: '',
    password: ''
  };

  errorMessage: string = '';

  constructor(private router: Router) {}

  onLogin() {
    // BACKEND OLMADIĞI İÇİN MOCK (SAHTE) KONTROL
    // Gerçek projede burada bir API isteği olurdu.
    if (this.loginData.email === 'admin@datapulse.com' && this.loginData.password === '123456') {
      console.log('Giriş Başarılı!');

      // Hocanın istediği JWT simülasyonu için localStorage'a sahte bir token atalım
      localStorage.setItem('token', 'mock-jwt-token-for-cse214');

      this.router.navigate(['/products']); // Başarılıysa ürünlere git
    } else {
      this.errorMessage = 'E-posta veya şifre hatalı! (İpucu: admin@datapulse.com / 123456)';
    }
  }
}
