import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../environments/environment';

export interface Product {
  id: number;
  name: string;
  price: number;
  sku: string;
  imageUrl: string;
  icon?: string;
  description: string;
  categoryName: string;
  category?: string; 
  rating: number;
  reviewCount: number;
  stock: number;
  specs?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<any>(`${environment.apiUrl}/products`)
      .pipe(map(res => {
        // Backend'in Pageable verisinden content'i çekiyoruz.
        const items: Product[] = res.data.content || res.data;
        return items.map(p => ({
          ...p,
          icon: p.imageUrl, // Eski koddaki icon'u imageUrl ile eşledik (Template bozulmasın diye geçici)
          category: p.categoryName || 'Tüm Kategoriler' // Filtreleme için uyumluluk
        }));
      }));
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<any>(`${environment.apiUrl}/products/${id}`)
      .pipe(map(res => {
        const p = res.data;
        p.icon = p.imageUrl;
        p.category = p.categoryName;
        return p;
      }));
  }
}
