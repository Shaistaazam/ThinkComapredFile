import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { ProductCardComponent, Product } from '../../components/product-card/product-card.component';
import { CategoryHeroComponent } from '../../components/category-hero/category-hero.component';
import { HotDealsComponent } from '../../components/hot-deals/hot-deals.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor, ProductCardComponent, CategoryHeroComponent, HotDealsComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  products: Product[] = [
    {
      id: 1,
      name: 'New LG IID RES MONITOR',
      price: 275.97,
      description: 'IN STOCK',
      imageUrl: 'assets/images/pick1.png',
      rating: 4.5
    },
    {
      id: 2,
      name: 'New LG IID RES MONITOR',
      price: 275.97,
      description: 'IN STOCK',
      imageUrl: 'assets/images/pick2.png',
      rating: 4.2
    },
    {
      id: 3,
      name: 'New LG IID RES MONITOR',
      price: 275.97,
      description: 'IN STOCK',
      imageUrl: 'assets/images/pick3.png',
      rating: 4.0
    },
    {
      id: 4,
      name: 'New LG IID RES MONITOR',
      price: 275.97,
      description: 'IN STOCK',
      imageUrl: 'assets/images/pick4.png',
      rating: 4.7
    },
    {
      id: 5,
      name: 'New LG IID RES MONITOR',
      price: 275.97,
      description: 'IN STOCK',
      imageUrl: 'assets/images/pick5.png',
      rating: 4.5
    },
    {
      id: 6,
      name: 'New LG IID RES MONITOR',
      price: 275.97,
      description: 'IN STOCK',
      imageUrl: 'assets/images/pick6.png',
      rating: 4.3
    },
    {
      id: 7,
      name: 'New LG IID RES MONITOR',
      price: 275.97,
      description: 'IN STOCK',
      imageUrl: 'assets/images/pick7.png',
      rating: 4.6
    },
    {
      id: 8,
      name: 'New LG IID RES MONITOR',
      price: 275.97,
      description: 'IN STOCK',
      imageUrl: 'assets/images/pick8.png',
      rating: 4.4
    }
  ];
}