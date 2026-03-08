import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ProductService, Product } from '../product.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {
  products: Product[] = [];
  showAuthModal: boolean = false;
  selectedProduct: Product | null = null;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.products = this.productService.getProducts();
  }

  // NAVBARDAKİ SEPET SAYACI İÇİN EKLENDİ
  get cartCount(): number {
    return this.cartService.getTotalItemsCount();
  }

  onAddToCartClick(product: Product) {
    this.selectedProduct = product;
    this.showAuthModal = true;
  }

  continueAsGuest() {
    if (this.selectedProduct) {
      this.cartService.addToCart(this.selectedProduct);
    }
    this.showAuthModal = false;
    this.router.navigate(['/cart']);
  }

  goToLogin() {
    if (this.selectedProduct) {
      this.cartService.addToCart(this.selectedProduct);
    }
    this.showAuthModal = false;
    this.router.navigate(['/login']);
  }

  closeModal() {
    this.showAuthModal = false;
  }
}
