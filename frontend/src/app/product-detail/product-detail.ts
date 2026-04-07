import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // FORM İÇİN EKLENDİ
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { Gemini } from '../gemini';
import { ProductService, Product } from '../product.service';
import { CartService } from '../cart.service';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

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

  // Yorumlar backend'den gelecek
  reviews: Review[] = [];

  newReview = { rating: 5, text: '' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private gemini: Gemini,
    private cdr: ChangeDetectorRef,
    public authService: AuthService,
    private http: HttpClient
  ) {}

  get isAuth(): boolean { return this.authService.isAuthenticated(); }
  get currentUser(): any { return this.authService.getCurrentUser(); }
  
  logout() {
    this.authService.logout();
    this.cdr.detectChanges(); 
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe({
      next: (p) => {
        const mappedProduct = p; 
        if (mappedProduct) {
          mappedProduct.icon = mappedProduct.imageUrl;
        }
        
        this.product = mappedProduct;
        
        if (this.product) {
          this.messages.push({ sender: 'ai', text: `Merhaba! ${this.product.name} modeli hakkında her şeyi sorabilirsiniz.` });
          // Yorumları backend'den çek
          this.loadReviews(id);
          this.cdr.detectChanges();
        }
      },
      error: (err) => console.error('Ürün bulunamadı', err)
    });
  }

  loadReviews(productId: number) {
    this.http.get<any>(`${environment.apiUrl}/reviews/product/${productId}`).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.reviews = res.data.map((r: any) => ({
            author: r.user?.fullName || 'Anonim',
            avatar: (r.user?.fullName || 'A').charAt(0).toUpperCase(),
            rating: r.starRating,
            date: new Date(r.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
            text: r.reviewText,
            helpfulCount: 0
          }));
          this.cdr.detectChanges();
        }
      },
      error: (err) => console.warn('Yorumlar yüklenemedi:', err)
    });
  }

  get cartCount(): number { return this.cartService.getTotalItemsCount(); }

  // YENİ: Yıldız Çizdirme Fonksiyonu
  getStars(rating: number): string { return '⭐'.repeat(rating); }

  // YENİ: Yorum Gönderme Fonksiyonu
  submitReview() {
    if (!this.isAuth) {
      alert('Yorum yapabilmek için giriş yapmalısınız!');
      this.router.navigate(['/login']);
      return;
    }

    if (this.newReview.text.trim() === '') {
      alert('Lütfen bir yorum yazın!');
      return;
    }

    const payload = {
      productId: this.product?.id,
      starRating: this.newReview.rating,
      reviewText: this.newReview.text
    };

    this.http.post<any>(`${environment.apiUrl}/reviews`, payload).subscribe({
      next: (res) => {
        // Başarılı - yorumu listeye ekle
        const user = this.currentUser;
        this.reviews.unshift({
          author: user?.fullName || 'Sen',
          avatar: (user?.fullName || 'S').charAt(0).toUpperCase(),
          rating: this.newReview.rating,
          date: 'Şimdi',
          text: this.newReview.text,
          helpfulCount: 0
        });
        this.newReview.text = '';
        this.newReview.rating = 5;
        this.cdr.detectChanges();
        alert('Yorumunuz başarıyla gönderildi!');
      },
      error: (err) => {
        console.error('Yorum gönderilemedi:', err);
        alert('Yorum gönderilirken bir hata oluştu.');
      }
    });
  }

  // --- Sepet ve Chatbot Fonksiyonları ---
  onAddToCartClick() { 
    if (this.isAuth && this.product) {
      this.cartService.addToCart(this.product);
      alert('Ürün sepete eklendi!');
    } else {
      this.showAuthModal = true; 
    }
  }
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
