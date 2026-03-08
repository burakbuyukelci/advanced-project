import { Routes } from '@angular/router';
import { Login } from './login/login';
import { ProductList } from './product-list/product-list';
import { ProductDetail } from './product-detail/product-detail';
import { CartComponent } from './cart/cart'; // SEPET SAYFASINI İÇERİ ALDIK

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'products', component: ProductList },
  { path: 'product/:id', component: ProductDetail },
  { path: 'cart', component: CartComponent } // İŞTE ÇÖZÜM: '/cart' YOLUNU SİSTEME TANITTIK!
];
