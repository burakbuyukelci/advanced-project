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
  // Zenginleştirilmiş ürün veritabanımız
  private products: Product[] = [
    { id: 1, name: 'DataPulse Smart Watch', price: 299.99, sku: 'DP-SW-01', icon: '⌚', specs: ['Heart rate tracking & GPS', '7-day battery life', 'Water resistant up to 50m', 'OLED display'] },
    { id: 2, name: 'DataPulse Wireless Earbuds', price: 149.99, sku: 'DP-WE-02', icon: '🎧', specs: ['Active Noise Cancellation', '24h total battery', 'Bluetooth 5.3', 'Touch controls'] },
    { id: 3, name: 'DataPulse Vision VR', price: 499.00, sku: 'DP-VR-03', icon: '👓', specs: ['4K resolution per eye', '120Hz refresh rate', 'Built-in spatial audio', 'Wireless capability'] },
    { id: 4, name: 'DataPulse DevBook Pro', price: 1899.00, sku: 'DP-LT-04', icon: '💻', specs: ['16-core Neural CPU', '32GB Unified Memory', '1TB NVMe SSD', '16-inch Retina Display'] },
    { id: 5, name: 'DataPulse 4K Creator Monitor', price: 549.99, sku: 'DP-MN-05', icon: '🖥️', specs: ['32-inch 4K UHD', '99% sRGB color accuracy', 'USB-C Power Delivery', 'Ergonomic stand'] },
    { id: 6, name: 'DataPulse Mechanical Keyboard', price: 129.50, sku: 'DP-KB-06', icon: '⌨️', specs: ['Tactile mechanical switches', 'Customizable RGB', 'Wireless & Wired modes', 'Ergonomic wrist rest'] },
    { id: 7, name: 'DataPulse Smart Tuner Pro', price: 45.00, sku: 'DP-ST-07', icon: '🎼', specs: ['High-precision acoustic tuning', 'Optimized for string instruments like Bağlama', 'Clip-on design', 'Rechargeable battery'] },
    { id: 8, name: 'DataPulse PowerBank 20K', price: 59.99, sku: 'DP-PB-08', icon: '🔋', specs: ['20,000 mAh capacity', '65W Fast Charging', 'Dual USB-C ports', 'Airline safe'] }
  ];

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }
}
