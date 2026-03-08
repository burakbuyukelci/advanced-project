import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  price: number;
  sku: string;
  icon: string;
  specs: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // Bütün ürün verilerimiz burada
  private products: Product[] = [
    { id: 1, name: 'DataPulse Smart Watch', price: 299.99, sku: 'DP-SW-01', icon: '⌚', specs: ['Heart rate tracking & GPS', '7-day battery life', 'Water resistant up to 50m', 'OLED display'] },
    { id: 2, name: 'DataPulse Wireless Earbuds', price: 149.99, sku: 'DP-WE-02', icon: '🎧', specs: ['Active Noise Cancellation', '24h total battery', 'Bluetooth 5.3', 'Touch controls'] },
    { id: 3, name: 'DataPulse Vision VR', price: 499.00, sku: 'DP-VR-03', icon: '👓', specs: ['4K resolution per eye', '120Hz refresh rate', 'Built-in spatial audio', 'Wireless capability'] }
  ];

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }
}
