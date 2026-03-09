import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { ProductService, Product } from '../product.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule], // FormsModule'ü kaldırdık
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail implements OnInit {
  product: Product | undefined;
  showAuthModal: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.productService.getProductById(id);
  }

  // NAVBARDAKİ SEPET SAYACI
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
}
