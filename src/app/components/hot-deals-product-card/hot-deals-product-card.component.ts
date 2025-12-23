import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { NgIf, NgFor } from '@angular/common';
import { ComparisonService } from '../../services/comparison.service';

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
  
  constructor(private comparisonService: ComparisonService) {}
  
  onCompareClick(): void {
    const result = this.comparisonService.addProduct(this.product);
    
    if (!result) {
      if (this.comparisonService.getComparisonList().length >= this.comparisonService.getMaxCompareItems()) {
        alert(`You can only compare up to ${this.comparisonService.getMaxCompareItems()} products.`);
      } else {
        alert('This product is already in the comparison list.');
      }
    }
  }
  
  isProductInComparison(): boolean {
    return this.comparisonService.isProductInComparison(this.product.id);
  }
}