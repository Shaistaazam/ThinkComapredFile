import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  rating: number;
}

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [NgFor],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: Product;
}