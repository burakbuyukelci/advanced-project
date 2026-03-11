import { Injectable } from '@angular/core';
import { Product } from './product.service';

// Yeni Yapı: Artık sadece ürünü değil, kaç tane olduğunu da tutuyoruz
export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: CartItem[] = [];

  // Sepete Ekleme Mantığı (Aynı üründen varsa sayısını artır, yoksa yeni ekle)
  addToCart(product: Product) {
    const existingItem = this.items.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({ product: product, quantity: 1 });
    }
  }

  // Sepetteki tüm ürünleri getir
  getItems() {
    return this.items;
  }

  // Sayıyı Artır
  increaseQuantity(productId: number) {
    const item = this.items.find(i => i.product.id === productId);
    if (item) item.quantity += 1;
  }

  // Sayıyı Azalt (Eğer 1'den düşerse sepetten tamamen sil)
  decreaseQuantity(productId: number) {
    const itemIndex = this.items.findIndex(i => i.product.id === productId);
    if (itemIndex !== -1) {
      if (this.items[itemIndex].quantity > 1) {
        this.items[itemIndex].quantity -= 1;
      } else {
        this.items.splice(itemIndex, 1); // Ürünü sepetten çıkar
      }
    }
  }

  // Ödeme sonrası sepeti tamamen boşaltmak için eklendi
  clearCart() {
    this.items = [];
  }

  // Ürünü sepetten direkt sil (Çöp kutusu butonu için)
  removeFromCart(productId: number) {
    this.items = this.items.filter(item => item.product.id !== productId);
  }

  // Toplam Sepet Tutarını Hesapla
  getCartTotal() {
    return this.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  // Sepetteki toplam ürün adedini getir (Navbar'daki sepet ikonu için)
  getTotalItemsCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }
}
