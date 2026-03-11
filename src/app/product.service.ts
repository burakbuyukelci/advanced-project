import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  price: number;
  sku: string;
  icon: string;
  specs: string[];
  category: string;     // YENİ: Kategori eklendi
  rating: number;       // YENİ: Yıldız puanı
  reviewCount: number;  // YENİ: Değerlendirme sayısı
  stock: number;        // YENİ: Stok adedi
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'DataPulse Smart Watch', price: 299.99, sku: 'DP-SW-01', icon: '⌚', category: 'Giyilebilir Teknoloji', rating: 4.8, reviewCount: 128, stock: 15, specs: ['Heart rate & GPS', '7-day battery'] },
    { id: 2, name: 'DataPulse Wireless Earbuds', price: 149.99, sku: 'DP-WE-02', icon: '🎧', category: 'Ses & Müzik', rating: 4.5, reviewCount: 85, stock: 3, specs: ['ANC', '24h battery'] },
    { id: 3, name: 'DataPulse Vision VR', price: 499.00, sku: 'DP-VR-03', icon: '👓', category: 'Giyilebilir Teknoloji', rating: 4.9, reviewCount: 42, stock: 8, specs: ['4K resolution', '120Hz'] },
    { id: 4, name: 'DataPulse DevBook Pro', price: 1899.00, sku: 'DP-LT-04', icon: '💻', category: 'Bilgisayar', rating: 5.0, reviewCount: 210, stock: 2, specs: ['16-core CPU', '32GB RAM'] },
    { id: 5, name: 'DataPulse 4K Creator Monitor', price: 549.99, sku: 'DP-MN-05', icon: '🖥️', category: 'Bilgisayar', rating: 4.7, reviewCount: 56, stock: 25, specs: ['32-inch 4K', '99% sRGB'] },
    { id: 6, name: 'DataPulse Mechanical Keyboard', price: 129.50, sku: 'DP-KB-06', icon: '⌨️', category: 'Aksesuarlar', rating: 4.6, reviewCount: 314, stock: 50, specs: ['Tactile switches', 'RGB'] },
    { id: 7, name: 'DataPulse Smart Tuner Pro', price: 45.00, sku: 'DP-ST-07', icon: '🎼', category: 'Ses & Müzik', rating: 4.3, reviewCount: 19, stock: 1, specs: ['High-precision', 'Clip-on'] },
    { id: 8, name: 'DataPulse PowerBank 20K', price: 59.99, sku: 'DP-PB-08', icon: '🔋', category: 'Aksesuarlar', rating: 4.8, reviewCount: 412, stock: 0, specs: ['20,000 mAh', '65W Fast Charge'] } // Stok bilerek 0 yapıldı (Tükendi testi için)
  ];

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }
}
