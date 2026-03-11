import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // FORM İÇİN EKLENDİ
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { Gemini } from '../gemini';
import { ProductService, Product } from '../product.service';
import { CartService } from '../cart.service';

// YENİ: Yorum Arayüzü
export interface Review {
  author: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
  helpfulCount: number;
}

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // FormsModule EKLENDİ
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail implements OnInit {
  product: Product | undefined;
  showAuthModal: boolean = false;

  // Chatbot Değişkenleri
  userQuery: string = '';
  loading: boolean = false;
  messages: { sender: 'user' | 'ai', text: string }[] = [];

  // YENİ: Yorum Değişkenleri
  reviews: Review[] = [
    { author: 'Ahmet Yılmaz', avatar: 'A', rating: 5, date: '12 Mart 2026', text: 'Ürün tek kelimeyle harika. Kargo çok hızlıydı, DataPulse kalitesi şaşırtmadı.', helpfulCount: 14 },
    { author: 'Selin Kaya', avatar: 'S', rating: 4, date: '05 Mart 2026', text: 'Fiyat performans ürünü. Sadece rengi beklediğimden bir tık koyu geldi ama sorun değil.', helpfulCount: 5 },
    { author: 'Caner Demir', avatar: 'C', rating: 5, date: '28 Şubat 2026', text: 'Yapay zeka asistanı sayesinde tam ihtiyacım olan modeli buldum. Teşekkürler!', helpfulCount: 32 }
  ];

  newReview = { rating: 5, text: '' }; // Kullanıcının yapacağı yeni yorum

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private gemini: Gemini,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.productService.getProductById(id);

    if (this.product) {
      this.messages.push({ sender: 'ai', text: `Merhaba! ${this.product.name} modeli hakkında her şeyi sorabilirsiniz.` });
    }
  }

  get cartCount(): number { return this.cartService.getTotalItemsCount(); }

  // YENİ: Yıldız Çizdirme Fonksiyonu
  getStars(rating: number): string { return '⭐'.repeat(rating); }

  // YENİ: Yorum Gönderme Fonksiyonu
  submitReview() {
    if (this.newReview.text.trim() === '') {
      alert('Lütfen bir yorum yazın!');
      return;
    }

    // Yeni yorumu listenin en başına ekle
    this.reviews.unshift({
      author: 'Sen (Misafir)',
      avatar: '👤',
      rating: this.newReview.rating,
      date: 'Şimdi',
      text: this.newReview.text,
      helpfulCount: 0
    });

    // Formu temizle
    this.newReview.text = '';
    this.newReview.rating = 5;
    alert('Yorumunuz başarıyla gönderildi ve onay sürecine alındı!');
  }

  // --- Sepet ve Chatbot Fonksiyonları (Eskisi gibi duruyor) ---
  onAddToCartClick() { this.showAuthModal = true; }
  continueAsGuest() { if (this.product) this.cartService.addToCart(this.product); this.showAuthModal = false; this.router.navigate(['/cart']); }
  goToLogin() { if (this.product) this.cartService.addToCart(this.product); this.showAuthModal = false; this.router.navigate(['/login']); }
  closeModal() { this.showAuthModal = false; }

  async askAi() {
    if (!this.userQuery.trim() || this.loading) return;
    const currentQuery = this.userQuery;
    const contextEnhancedQuery = `Müşteri şu an "${this.product?.name}" sayfasında. Soru: ${currentQuery}`;

    this.messages.push({ sender: 'user', text: currentQuery });
    this.userQuery = '';
    this.loading = true;
    const aiMessageIndex = this.messages.push({ sender: 'ai', text: '' }) - 1;

    try {
      await this.gemini.askQuestionStream(contextEnhancedQuery, (textChunk) => {
        this.messages[aiMessageIndex].text = textChunk;
        this.cdr.detectChanges();
      });
    } catch (error) {
      this.messages[aiMessageIndex].text = "Bir hata oluştu, lütfen tekrar sor.";
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }
}
