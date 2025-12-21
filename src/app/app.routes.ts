import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HotDealsComponent } from './pages/hot-deals/hot-deals.component';
import { CategoryComponent } from './pages/category/category.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AccountComponent } from './pages/account/account.component';
import { CategoryNextComponent } from './pages/category/category-next/category-next.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'category-next', component: CategoryNextComponent },
  { path: 'hot-deals', component: HotDealsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'account', component: AccountComponent },
  { path: '**', redirectTo: '' },
];
