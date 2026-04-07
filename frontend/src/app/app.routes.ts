import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { ProductList } from './product-list/product-list';
import { ProductDetail } from './product-detail/product-detail';
import { CartComponent } from './cart/cart';
import { Dashboard } from './dashboard/dashboard';
import { Checkout } from './checkout/checkout';
import { Orders } from './orders/orders';
import { Wishlist } from './wishlist/wishlist';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'products', component: ProductList },
  { path: 'product/:id', component: ProductDetail },
  { path: 'cart', component: CartComponent },
  { path: 'dashboard', component: Dashboard },
  { path: 'checkout', component: Checkout },
  { path: 'orders', component: Orders },
  { path: 'wishlist', component: Wishlist }
];
