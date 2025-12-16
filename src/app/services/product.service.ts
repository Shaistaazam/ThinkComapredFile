import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
      price: 99.99,
      category: 'Electronics',
      imageUrl: '',
      rating: 4.5,
      reviewsCount: 128,
      isFeatured: true
    },
    {
      id: 2,
      name: 'Smart Watch',
      description: 'Feature-rich smartwatch with health monitoring and waterproof design.',
      price: 199.99,
      category: 'Electronics',
      imageUrl: '',
      rating: 4.2,
      reviewsCount: 97,
      isNew: true
    },
    {
      id: 3,
      name: 'Bluetooth Speaker',
      description: 'Portable Bluetooth speaker with excellent sound quality and 12-hour battery.',
      price: 79.99,
      category: 'Audio',
      imageUrl: '',
      rating: 4.0,
      reviewsCount: 64
    },
    {
      id: 4,
      name: 'Gaming Mouse',
      description: 'Ergonomic gaming mouse with customizable buttons and RGB lighting.',
      price: 49.99,
      category: 'Accessories',
      imageUrl: '',
      rating: 4.7,
      reviewsCount: 215,
      isFeatured: true
    },
    {
      id: 5,
      name: 'Mechanical Keyboard',
      description: 'RGB mechanical keyboard with programmable keys and anti-ghosting.',
      price: 129.99,
      category: 'Accessories',
      imageUrl: '',
      rating: 4.8,
      reviewsCount: 189,
      isNew: true
    },
    {
      id: 6,
      name: 'External SSD',
      description: 'Fast external SSD with 1TB storage capacity and USB 3.2 Gen 2.',
      price: 149.99,
      category: 'Storage',
      imageUrl: '',
      rating: 4.3,
      reviewsCount: 76
    }
  ];
  
  getProducts(): Observable<Product[]> {
    return of(this.products);
  }
  
  getProductById(id: number): Observable<Product | undefined> {
    const product = this.products.find(p => p.id === id);
    return of(product);
  }
  
  getFeaturedProducts(): Observable<Product[]> {
    const featured = this.products.filter(p => p.isFeatured);
    return of(featured);
  }
  
  getProductsByCategory(category: string): Observable<Product[]> {
    const filtered = this.products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    return of(filtered);
  }
}