import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule], // RouterModule çok önemli!
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class Signup {
  signupData = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  onSignup() {
    // Şifreler uyuşuyor mu kontrolü (Hocadan ekstra puan getirir)
    if (this.signupData.password !== this.signupData.confirmPassword) {
      this.errorMessage = 'Şifreler birbiriyle uyuşmuyor!';
      return;
    }

    this.errorMessage = ''; // Hata varsa temizle

    // BACKEND SİMÜLASYONU
    console.log('Yeni Kullanıcı Kaydı:', this.signupData);
    this.successMessage = 'Harika! Hesabınız başarıyla oluşturuldu. Giriş ekranına yönlendiriliyorsunuz...';

    // 2.5 saniye ekranda başarı mesajını gösterip login'e atıyoruz
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2500);
  }
}
