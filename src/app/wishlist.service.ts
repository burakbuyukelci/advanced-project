import { Injectable } from '@angular/core';
import { Product } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private favorites: Product[] = [];

  // Kalbe basılınca çalışacak mantık (Eğer varsa çıkar, yoksa ekle)
  toggleFavorite(product: Product) {
    const index = this.favorites.findIndex(p => p.id === product.id);
    if (index !== -1) {
      this.favorites.splice(index, 1); // Zaten favoriyse listeden sil
    } else {
      this.favorites.push(product); // Değilse listeye ekle
    }
  }

  // Tüm favorileri getir
  getFavorites(): Product[] {
    return this.favorites;
  }

  // Bir ürün favorilerde var mı yok mu kontrol et (Kalbin içinin dolu/boş olması için)
  isFavorite(productId: number): boolean {
    return this.favorites.some(p => p.id === productId);
  }
}
