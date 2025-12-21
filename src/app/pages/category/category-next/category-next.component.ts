import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductFiltersComponent } from '../../../components/product-filters/product-filters.component';

@Component({
  selector: 'app-category-next',
  standalone: true,
  imports: [NgFor, RouterModule, ProductFiltersComponent],
  templateUrl: './category-next.component.html',
  styleUrl: './category-next.component.scss',
})
export class CategoryNextComponent {
  products = [
    { id: 1, name: 'Laptop 1', price: 999, rating: 4.5 },
    { id: 2, name: 'Laptop 2', price: 1299, rating: 4.2 },
    { id: 3, name: 'Laptop 3', price: 799, rating: 4.8 },
    { id: 4, name: 'Laptop 4', price: 1499, rating: 4.0 },
    { id: 5, name: 'Laptop 5', price: 1099, rating: 4.6 },
    { id: 6, name: 'Laptop 6', price: 899, rating: 4.3 },
  ];

  onFiltersChanged(filters: any) {
    // Handle filter changes
    console.log('Filters changed on next page:', filters);
  }
}