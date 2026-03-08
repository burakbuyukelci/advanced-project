import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { GeminiService } from '../gemini';
import { ProductService, Product } from '../product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-detail.html'
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;

  userQuery: string = '';
  loading: boolean = false;
  messages: { sender: 'user' | 'ai', text: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private geminiService: GeminiService
  ) {}

  ngOnInit() {
    // URL'den ID'yi çek ve o ürünü bul!
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.productService.getProductById(id);

    if (this.product) {
      this.messages.push({
        sender: 'ai',
        text: `Merhaba! ${this.product.name} hakkında merak ettiğin her şeyi yanıtlamaya hazırım.`
      });
    }
  }

  async askAi() {
    if (!this.userQuery.trim() || this.loading) return;

    // AI'ın hangi sayfada olduğunu bilmesi için Context (Bağlam) ekliyoruz
    const currentQuery = this.userQuery;
    const contextEnhancedQuery = `Müşteri şu an "${this.product?.name}" ürün sayfasında. Soru: ${currentQuery}`;

    this.messages.push({ sender: 'user', text: currentQuery });
    this.userQuery = '';
    this.loading = true;

    const response = await this.geminiService.askQuestion(contextEnhancedQuery);

    this.messages.push({ sender: 'ai', text: response });
    this.loading = false;
  }
}
