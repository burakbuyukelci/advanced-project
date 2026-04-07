import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

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

  loading: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  onSignup() {
    // Şifreler uyuşuyor mu kontrolü (Hocadan ekstra puan getirir)
    if (this.signupData.password !== this.signupData.confirmPassword) {
      this.errorMessage = 'Şifreler birbiriyle uyuşmuyor!';
      return;
    }

    this.errorMessage = ''; // Hata varsa temizle
    this.loading = true;

    // Backend'e yollanacak veriler
    const payload = {
      fullName: this.signupData.fullName,
      email: this.signupData.email,
      password: this.signupData.password
    };

    this.authService.register(payload).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.success) {
          this.successMessage = 'Harika! Hesabınız başarıyla oluşturuldu. Giriş ekranına yönlendiriliyorsunuz...';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2500);
        } else {
          this.errorMessage = res.message || 'Kayıt sırasında bir hata oluştu.';
        }
      },
      error: (err) => {
        this.loading = false;
        console.error("Kayıt hatası", err);
        
        if (err.error?.message) {
           this.errorMessage = err.error.message;
        } else if (err.error && !err.error.success) {
           this.errorMessage = 'Kayıt olunamadı! Lütfen bilgilerinizi kontrol edin.';
        } else {
           this.errorMessage = 'Kayıt işlemi başarısız. Lütfen mail adresini veya bilgileri kontrol edip tekrar deneyin.';
        }
      }
    });
  }
}
