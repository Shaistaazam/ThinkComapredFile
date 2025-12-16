import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HelpSectionComponent } from '../../components/help-section/help-section.component';
import { BestSellersComponent } from '../../components/best-sellers/best-sellers.component';
import { CategoryHeroComponent } from '../../components/category-hero/category-hero.component';

@Component({
  selector: 'app-category',
  standalone: true,
    imports: [HelpSectionComponent, BestSellersComponent, CategoryHeroComponent],
    templateUrl: './category.component.html',
})
export class CategoryComponent {

  constructor(private router: Router) {}

  goToProductList() {
    this.router.navigate(['/products']);
  }

}
