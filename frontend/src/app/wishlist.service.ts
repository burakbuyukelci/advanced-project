import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private favoritesSubject = new BehaviorSubject<Product[]>([]);
  public favorites$ = this.favoritesSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadWishlist() {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.http.get<any>(`${environment.apiUrl}/wishlist`).subscribe({
      next: (res) => {
        if (res.success) {
          const items = res.data.map((p: any) => ({
            ...p,
            icon: p.imageUrl,
            category: p.categoryName || 'Tüm Kategoriler'
          }));
          this.favoritesSubject.next(items);
        }
      },
      error: (err) => console.warn('Favoriler yüklenemedi (Yetkisiz rol olabilir):', err.status)
    });
  }

  toggleFavorite(product: Product) {
    if (this.isFavorite(product.id)) {
      this.http.delete<any>(`${environment.apiUrl}/wishlist/${product.id}`).subscribe({
        next: () => this.loadWishlist()
      });
    } else {
      this.http.post<any>(`${environment.apiUrl}/wishlist`, { productId: product.id }).subscribe({
        next: () => this.loadWishlist()
      });
    }
  }

  getFavorites(): Product[] {
    if (this.favoritesSubject.value.length === 0 && localStorage.getItem('token')) {
      this.loadWishlist();
    }
    return this.favoritesSubject.value;
  }

  isFavorite(productId: number): boolean {
    return this.favoritesSubject.value.some(p => p.id === productId);
  }
}
