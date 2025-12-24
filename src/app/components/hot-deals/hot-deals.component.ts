import { Component, Input, OnInit } from '@angular/core';
import { ProductCardComponent, Product } from '../product-card/product-card.component';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-hot-deals',
  standalone: true,
  imports: [NgFor, ProductCardComponent],
  templateUrl: './hot-deals.component.html',
  styleUrls: ['./hot-deals.component.scss'],
})
export class HotDealsComponent implements OnInit {
  @Input() products: Product[] = [];

  constructor(
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit() {
    // If no products were passed in, fetch featured products
    if (this.products.length === 0) {
      this.productService.getFeaturedProducts().subscribe(
        products => this.products = products
      );
    }
  }

  navigateToProducts() {
    this.router.navigate(['/products']);
  }
}
