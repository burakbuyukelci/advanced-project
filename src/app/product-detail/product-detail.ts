import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { Gemini } from '../gemini';
import { ProductService, Product } from '../product.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail implements OnInit {
  product: Product | undefined;

  userQuery: string = '';
  loading: boolean = false;
  messages: { sender: 'user' | 'ai', text: string }[] = [];
  showAuthModal: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private geminiService: Gemini,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.productService.getProductById(id);

    if (this.product) {
      this.messages.push({
        sender: 'ai',
        text: `Merhaba! ${this.product.name} modeli hakkında her şeyi sorabilirsiniz.`
      });
    }
  }

  // NAVBARDAKİ SEPET SAYACI İÇİN EKLENDİ
  get cartCount(): number {
    return this.cartService.getTotalItemsCount();
  }

  onAddToCartClick() { this.showAuthModal = true; }

  continueAsGuest() {
    if (this.product) this.cartService.addToCart(this.product);
    this.showAuthModal = false;
    this.router.navigate(['/cart']);
  }

  goToLogin() {
    if (this.product) this.cartService.addToCart(this.product);
    this.showAuthModal = false;
    this.router.navigate(['/login']);
  }

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
      await this.geminiService.askQuestionStream(contextEnhancedQuery, (textChunk) => {
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
