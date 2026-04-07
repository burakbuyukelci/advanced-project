import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './product.service';
import { environment } from '../environments/environment';

export interface CartItem {
  cartItemId: number;
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemsSubject = new BehaviorSubject<CartItem[]>([]);
  public items$ = this.itemsSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Sepeti Sunucudan Yükle
  loadCart() {
    // Sadece giriş yapmış kullanıcılar sepeti çekebilir (ya da backend hata fırlatmazsa çalışır)
    const token = localStorage.getItem('token');
    if (!token) return;

    this.http.get<any>(`${environment.apiUrl}/cart`).subscribe({
      next: (res) => {
        if (res.success) {
          const mappedItems: CartItem[] = res.data.map((backendItem: any) => ({
            cartItemId: backendItem.id,
            quantity: backendItem.quantity,
            product: {
              id: backendItem.productId,
              name: backendItem.productName,
              sku: backendItem.productSku,
              price: backendItem.price,
              icon: backendItem.imageUrl,
              imageUrl: backendItem.imageUrl,
              description: '', categoryName: '', rating: 0, reviewCount: 0, stock: 0
            }
          }));
          this.itemsSubject.next(mappedItems);
        }
      },
      error: (err) => console.warn('Sepet verisi alınamadı (Yetkisiz rol olabilir):', err.status)
    });
  }

  getItems(): CartItem[] {
    if (this.itemsSubject.value.length === 0) {
      this.loadCart(); // Eğer boşsa tetikle
    }
    return this.itemsSubject.value;
  }

  addToCart(product: Product) {
    this.http.post<any>(`${environment.apiUrl}/cart`, { productId: product.id, quantity: 1 }).subscribe({
      next: () => this.loadCart(),
      error: (err) => console.error('Sepete eklenemedi', err)
    });
  }

  // DİKKAT: Artık productId değil cartItemId üzerinden çalışacak fakat UI productId yollayabilir, düzeltmeliyiz.
  // UI productId gönderiyor ise eşleştirebiliriz.
  increaseQuantity(productId: number) {
    const item = this.itemsSubject.value.find(i => i.product.id === productId);
    if (item) {
      this.http.patch<any>(`${environment.apiUrl}/cart/${item.cartItemId}`, { quantity: item.quantity + 1 }).subscribe({
        next: () => this.loadCart()
      });
    }
  }

  decreaseQuantity(productId: number) {
    const item = this.itemsSubject.value.find(i => i.product.id === productId);
    if (item) {
      if (item.quantity > 1) {
        this.http.patch<any>(`${environment.apiUrl}/cart/${item.cartItemId}`, { quantity: item.quantity - 1 }).subscribe({
          next: () => this.loadCart()
        });
      } else {
        this.removeFromCart(productId);
      }
    }
  }

  removeFromCart(productId: number) {
    const item = this.itemsSubject.value.find(i => i.product.id === productId);
    if (item) {
      this.http.delete<any>(`${environment.apiUrl}/cart/${item.cartItemId}`).subscribe({
        next: () => this.loadCart()
      });
    }
  }

  clearCart() {
    this.http.delete<any>(`${environment.apiUrl}/cart`).subscribe({
      next: () => this.itemsSubject.next([])
    });
  }

  getCartTotal() {
    return this.itemsSubject.value.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  getTotalItemsCount() {
    return this.itemsSubject.value.reduce((count, item) => count + item.quantity, 0);
  }
}
