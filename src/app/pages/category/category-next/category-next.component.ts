import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FilterSidebarComponent } from '../../../components/filter-sidebar/filter-sidebar.component';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { HotDealsProductCardComponent } from '../../../components/hot-deals-product-card/hot-deals-product-card.component';

@Component({
  selector: 'app-category-next',
  standalone: true,
  imports: [NgFor, NgIf, RouterModule, FilterSidebarComponent, HotDealsProductCardComponent, FormsModule],
  templateUrl: './category-next.component.html',
  styleUrl: './category-next.component.scss',
})
export class CategoryNextComponent implements OnInit {
  products: Product[] = [];
  selectedCategory: string = '';
  isLoading: boolean = false;

  // Map category names to API category IDs
  private categoryMapping: { [key: string]: number } = {
    'laptops': 22,
    'mobile-phones': 3,
    'desktops': 24,
    'monitors': 23
  };

  // Map category names to display names
  private categoryDisplayNames: { [key: string]: string } = {
    'laptops': 'Laptops',
    'mobile-phones': 'Mobile Phones',
    'desktops': 'Desktops',
    'monitors': 'Monitors'
  };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategory = params['category'];
      }
      this.loadProductsFromAPI();
    });
  }

  loadProductsFromAPI() {
    this.isLoading = true;

    // Get category ID from mapping, or undefined for all categories
    const categoryId = this.selectedCategory ? this.categoryMapping[this.selectedCategory] : undefined;
    const categoryName = this.selectedCategory ? this.categoryDisplayNames[this.selectedCategory] : 'All';
    
    console.log(`Fetching products for category: ${this.selectedCategory} (ID: ${categoryId})`);
    
    // Using the getProducts method to fetch products from local JSON
    this.productService.getProducts().subscribe(
      (products: Product[]) => {
        // Filter by category if selected
        if (this.selectedCategory) {
          // Define the correct category mapping for filtering
          const categoryMap: { [key: number]: string } = {
            22: 'laptop',
            23: 'audio',
            24: 'laptop',
            3: 'mobile'
          };
          
          // Determine the actual category to filter by based on the selected category
          let filterCategory: string | undefined;
          switch (categoryId) {
            case 22: // 'laptops' -> 'laptop'
              filterCategory = 'laptop';
              break;
            case 23: // 'monitors' -> 'audio'
              filterCategory = 'audio';
              break;
            case 24: // 'desktops' -> 'laptop'
              filterCategory = 'laptop';
              break;
            case 3: // 'mobile-phones' -> 'mobile'
              filterCategory = 'mobile';
              break;
          }
          
          if (filterCategory) {
            products = products.filter(p => p.category.toLowerCase().includes(filterCategory));
          }

        }
        
        this.products = products;
        this.isLoading = false;
        console.log(`Loaded ${this.products.length} products for category: ${categoryName}`);
      },
      (error: any) => {
        console.error('Error loading products from JSON:', error);
        this.isLoading = false;
      }
    );
  }

  onFiltersChanged(filters: any) {
    // TODO: Implement filter functionality
  }

  getCategoryDisplayName(): string {
    if (this.selectedCategory && this.categoryDisplayNames[this.selectedCategory]) {
      return this.categoryDisplayNames[this.selectedCategory];
    }
    return 'All Products';
  }
}