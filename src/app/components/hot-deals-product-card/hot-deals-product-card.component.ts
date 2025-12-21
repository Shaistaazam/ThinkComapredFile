import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-hot-deals-product-card',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './hot-deals-product-card.component.html',
  styleUrls: ['./hot-deals-product-card.component.scss']
})
export class HotDealsProductCardComponent {
  @Input() product!: Product;
  Math = Math; // Make Math available in template
}