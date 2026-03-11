import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { ProductList } from './product-list/product-list';
import { ProductDetail } from './product-detail/product-detail';
import { CartComponent } from './cart/cart'; // SEPET SAYFASINI İÇERİ ALDIK
import { Dashboard } from './dashboard/dashboard';
import { Checkout } from './checkout/checkout'; // CHECKOUT SAYFASINI İÇERİ ALDIK
import { Orders } from './orders/orders'; // SİPARİŞLER SAYFASINI İÇERİ ALDIK
import { Wishlist } from './wishlist/wishlist'; // FAVORİLER SAYFASINI İÇERİ ALDIK

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'products', component: ProductList },
  { path: 'product/:id', component: ProductDetail },
  { path: 'cart', component: CartComponent }, // İŞTE ÇÖZÜM: '/cart' YOLUNU SİSTEME TANITTIK!
  { path: 'dashboard', component: Dashboard },
  { path: 'checkout', component: Checkout }, // İŞTE ÇÖZÜM: '/checkout' YOLUNU SİSTEME TANITTIK!
  { path: 'orders', component: Orders }, // İŞTE ÇÖZÜM: '/orders' YOLUNU SİSTEME TANITTIK!
  { path: 'wishlist', component: Wishlist } // İŞTE ÇÖZÜM: '/wishlist' YOLUNU SİSTEME TANITTIK!
];
