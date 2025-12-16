import { Component, Input } from '@angular/core';
import { ProductCardComponent, Product } from '../product-card/product-card.component';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hot-deals',
  standalone: true,
  imports: [NgFor, ProductCardComponent],
  templateUrl: './hot-deals.component.html',
  styleUrls: ['./hot-deals.component.scss']
})
export class HotDealsComponent {
  @Input() products: Product[] = [];
  
  constructor(private router: Router) { }

  navigateToProducts() {
    this.router.navigate(['/products']);
  }
}