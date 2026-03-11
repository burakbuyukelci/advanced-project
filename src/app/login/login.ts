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
    if (this.loginData.email === 'admin@datapulse.com' && this.loginData.password === '123456') {
      console.log('Admin Girişi Başarılı!');
      localStorage.setItem('token', 'mock-jwt-token-for-cse214');

      // İŞTE DEĞİŞİKLİK BURADA: Artık ürünlere değil, admin paneline (dashboard) gidiyoruz!
      this.router.navigate(['/dashboard']);

    } else {
      this.errorMessage = 'E-posta veya şifre hatalı! (İpucu: admin@datapulse.com / 123456)';
    }
  }
}
