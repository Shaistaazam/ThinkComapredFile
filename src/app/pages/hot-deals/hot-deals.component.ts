import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryHeroComponent } from '../../components/category-hero/category-hero.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { HotDealsProductCardComponent } from '../../components/hot-deals-product-card/hot-deals-product-card.component';
import { FilterSidebarComponent } from '../../components/filter-sidebar/filter-sidebar.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FloatingCompareButtonComponent } from '../../components/floating-compare-button/floating-compare-button.component';

@Component({
  selector: 'app-hot-deals',
  standalone: true,
  imports: [
    CategoryHeroComponent,
    HotDealsProductCardComponent,
    FilterSidebarComponent,
    PaginationComponent,
    FloatingCompareButtonComponent,
    NgFor,
    NgIf,
    FormsModule
  ],
  templateUrl: './hot-deals.component.html',
  styleUrls: ['./hot-deals.component.scss'],
})
export class HotDealsComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  pagination: {pageNo: number, perPage: number, totalItems: number, selectedItems: number} | null = null;
  currentPage = 1;
  selectedItemsPerPage = 12; // Default items per page
  itemsPerPageOptions = [12, 24, 48, 96]; // Items per page options
  selectedCategoryId: number | undefined = undefined; // No filter by default to show all
  selectedFilters: { [key: string]: string[] } = {}; // Selected filters
  selectedSortOption: string = 'popular'; // Default sort option
  Math = Math; // Make Math available in template

  categories = [
    { id: undefined, name: 'All Categories' },
    { id: 22, name: 'Laptops' },
    { id: 23, name: 'Monitors' },
    { id: 24, name: 'Desktops' },
    { id: 3, name: 'Mobiles' }
  ];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Set default values
    this.selectedItemsPerPage = 12;
    this.selectedCategoryId = undefined;

    // Listen for query parameter changes
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategoryId = Number(params['category']);
      }
      this.loadHotDealProducts();
    });
  }

  loadHotDealProducts(pageNo: number = 1): void {
    this.loading = true;

    // Use hardcoded products instead of API
    const allProducts: Product[] = [
      {
        id: 1,
        name: 'New LG IID RES MONITOR',
        price: 275.97,
        description: 'IN STOCK',
        imageUrl: 'assets/images/pick1.png',
        rating: 4.5,
        category: 'monitor',
        reviewsCount: 10,
      },
      {
        id: 2,
        name: 'Samsung Galaxy S22',
        price: 799.99,
        description: 'IN STOCK',
        imageUrl: 'assets/images/pick2.png',
        rating: 4.2,
        category: 'mobile',
        reviewsCount: 15,
      },
      {
        id: 3,
        name: 'Apple MacBook Pro',
        price: 1299.99,
        description: 'IN STOCK',
        imageUrl: 'assets/images/pick3.png',
        rating: 4.0,
        category: 'laptop',
        reviewsCount: 8,
      },
      {
        id: 4,
        name: 'Dell Inspiron Desktop',
        price: 699.99,
        description: 'IN STOCK',
        imageUrl: 'assets/images/pick4.png',
        rating: 4.7,
        category: 'desktop',
        reviewsCount: 12,
      },
      {
        id: 5,
        name: 'HP Pavilion Laptop',
        price: 899.99,
        description: 'IN STOCK',
        imageUrl: 'assets/images/pick5.png',
        rating: 4.5,
        category: 'laptop',
        reviewsCount: 20,
      },
      {
        id: 6,
        name: 'Sony Monitor',
        price: 349.99,
        description: 'IN STOCK',
        imageUrl: 'assets/images/pick6.png',
        rating: 4.3,
        category: 'monitor',
        reviewsCount: 5,
      },
      {
        id: 7,
        name: 'iPhone 13',
        price: 999.99,
        description: 'IN STOCK',
        imageUrl: 'assets/images/pick7.png',
        rating: 4.6,
        category: 'mobile',
        reviewsCount: 25,
      },
      {
        id: 8,
        name: 'Lenovo ThinkPad',
        price: 1199.99,
        description: 'IN STOCK',
        imageUrl: 'assets/images/pick8.png',
        rating: 4.4,
        category: 'laptop',
        reviewsCount: 18,
      },
      {
        id: 9,
        name: 'Asus Vivobook Laptop',
        price: 749.99,
        description: 'IN STOCK',
        imageUrl: 'assets/images/pick1.png',
        rating: 4.3,
        category: 'laptop',
        reviewsCount: 16,
      },
      {
        id: 10,
        name: 'Google Pixel 6',
        price: 699.00,
        description: 'IN STOCK',
        imageUrl: 'assets/images/pick2.png',
        rating: 4.7,
        category: 'mobile',
        reviewsCount: 22,
      },
      {
        id: 11,
        name: 'Samsung Odyssey Monitor',
        price: 499.99,
        description: 'IN STOCK',
        imageUrl: 'assets/images/pick3.png',
        rating: 4.8,
        category: 'monitor',
        reviewsCount: 14,
      },
      {
        id: 12,
        name: 'Alienware Desktop',
        price: 1599.99,
        description: 'IN STOCK',
        imageUrl: 'assets/images/pick4.png',
        rating: 4.9,
        category: 'desktop',
        reviewsCount: 9,
      },
      {
        id: 13,
        name: 'Microsoft Surface Pro',
        price: 1199.99,
        description: 'IN STOCK',
        imageUrl: 'assets/images/pick5.png',
        rating: 4.6,
        category: 'laptop',
        reviewsCount: 11,
      },
      {
        id: 14,
        name: 'OnePlus 9 Pro',
        price: 899.99,
        description: 'IN STOCK',
        imageUrl: 'assets/images/pick6.png',
        rating: 4.5,
        category: 'mobile',
        reviewsCount: 19,
      },
      {
        id: 15,
        name: 'LG UltraGear Monitor',
        price: 599.99,
        description: 'IN STOCK',
        imageUrl: 'assets/images/pick7.png',
        rating: 4.7,
        category: 'monitor',
        reviewsCount: 13,
      },
      {
        id: 16,
        name: 'MacBook Air M2',
        price: 1199.00,
        description: 'IN STOCK',
        imageUrl: 'assets/images/pick8.png',
        rating: 4.8,
        category: 'laptop',
        reviewsCount: 24,
      },
      {
        id: 17,
        name: 'HP EliteBook',
        price: 1099.99,
        description: 'IN STOCK',
        imageUrl: 'assets/images/pick1.png',
        rating: 4.4,
        category: 'laptop',
        reviewsCount: 17,
      },
      {
        id: 18,
        name: 'Xiaomi Redmi Note',
        price: 399.99,
        description: 'IN STOCK',
        imageUrl: 'assets/images/pick2.png',
        rating: 4.3,
        category: 'mobile',
        reviewsCount: 30,
      },
      {
        id: 19,
        name: 'Dell UltraSharp Monitor',
        price: 379.99,
        description: 'IN STOCK',
        imageUrl: 'assets/images/pick3.png',
        rating: 4.6,
        category: 'monitor',
        reviewsCount: 12,
      },
      {
        id: 20,
        name: 'iMac 24-inch',
        price: 1299.99,
        description: 'IN STOCK',
        imageUrl: 'assets/images/pick4.png',
        rating: 4.7,
        category: 'desktop',
        reviewsCount: 7,
      },
      {
        id: 21,
        name: 'Acer Aspire Laptop',
        price: 649.99,
        description: 'IN STOCK',
        imageUrl: 'assets/images/pick5.png',
        rating: 4.2,
        category: 'laptop',
        reviewsCount: 15,
      },
      {
        id: 22,
        name: 'Motorola Edge 30',
        price: 599.99,
        description: 'IN STOCK',
        imageUrl: 'assets/images/pick6.png',
        rating: 4.4,
        category: 'mobile',
        reviewsCount: 11,
      },
      {
        id: 23,
        name: 'AOC Gaming Monitor',
        price: 299.99,
        description: 'IN STOCK',
        imageUrl: 'assets/images/pick7.png',
        rating: 4.5,
        category: 'monitor',
        reviewsCount: 18,
      },
      {
        id: 24,
        name: 'MSI Gaming Desktop',
        price: 1499.99,
        description: 'IN STOCK',
        imageUrl: 'assets/images/pick8.png',
        rating: 4.8,
        category: 'desktop',
        reviewsCount: 8,
      },
      {
        id: 25,
        name: 'Razer Blade 15',
        price: 1999.99,
        description: 'IN STOCK',
        imageUrl: 'assets/images/pick1.png',
        rating: 4.9,
        category: 'laptop',
        reviewsCount: 6,
      },
      {
        id: 26,
        name: 'Samsung Galaxy S21',
        price: 749.99,
        description: 'IN STOCK',
        imageUrl: 'assets/images/pick2.png',
        rating: 4.6,
        category: 'mobile',
        reviewsCount: 21,
      },
      {
        id: 27,
        name: 'BenQ Monitor',
        price: 429.99,
        description: 'IN STOCK',
        imageUrl: 'assets/images/pick3.png',
        rating: 4.7,
        category: 'monitor',
        reviewsCount: 14,
      },
      {
        id: 28,
        name: 'CyberPowerPC Gaming',
        price: 1199.99,
        description: 'IN STOCK',
        imageUrl: 'assets/images/pick4.png',
        rating: 4.6,
        category: 'desktop',
        reviewsCount: 10,
      },
      {
        id: 29,
        name: 'Dell XPS 13',
        price: 1399.99,
        description: 'IN STOCK',
        imageUrl: 'assets/images/pick5.png',
        rating: 4.8,
        category: 'laptop',
        reviewsCount: 13,
      },
      {
        id: 30,
        name: 'iPhone 14',
        price: 1099.99,
        description: 'IN STOCK',
        imageUrl: 'assets/images/pick6.png',
        rating: 4.9,
        category: 'mobile',
        reviewsCount: 28,
      },
      {
        id: 31,
        name: 'LG 4K Monitor',
        price: 549.99,
        description: 'IN STOCK',
        imageUrl: 'assets/images/pick7.png',
        rating: 4.6,
        category: 'monitor',
        reviewsCount: 16,
      },
      {
        id: 32,
        name: 'Apple iMac 27-inch',
        price: 1799.99,
        description: 'IN STOCK',
        imageUrl: 'assets/images/pick8.png',
        rating: 4.9,
        category: 'desktop',
        reviewsCount: 5,
      },
    ];

    // Filter by category if selected
    let products = allProducts;
    if (this.selectedCategoryId !== undefined) {
      const categoryMap: { [key: number]: string } = {
        22: 'laptop',
        23: 'monitor',
        24: 'desktop',
        3: 'mobile'
      };
      const category = categoryMap[this.selectedCategoryId];
      if (category) {
        products = allProducts.filter(p => p.category.toLowerCase().includes(category));
      }
    }

    // Simple pagination based on the current page
    const startIndex = (pageNo - 1) * this.selectedItemsPerPage;
    const endIndex = startIndex + this.selectedItemsPerPage;
    this.products = products.slice(startIndex, endIndex);

    // Create a simple pagination object
    this.pagination = {
      pageNo: pageNo,
      perPage: this.selectedItemsPerPage,
      totalItems: products.length,
      selectedItems: this.products.length
    };

    this.loading = false;
    console.log('Hot deal products loaded:', this.products);
    console.log('Pagination:', this.pagination);

    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onNextPage(): void {
    if (this.pagination && this.canGoNext()) {
      this.loadHotDealProducts(this.currentPage + 1);
    }
  }

  onPreviousPage(): void {
    if (this.pagination && this.canGoPrevious()) {
      this.loadHotDealProducts(this.currentPage - 1);
    }
  }

  canGoNext(): boolean {
    if (!this.pagination) return false;
    return this.currentPage * this.pagination.perPage < this.pagination.totalItems;
  }

  canGoPrevious(): boolean {
    return this.currentPage > 1;
  }

  getTotalPages(): number {
    if (!this.pagination) return 0;
    // Calculate actual pages needed based on total items and items per page
    const totalPages = Math.ceil(this.pagination.totalItems / this.selectedItemsPerPage);
    console.log('Calculated total pages:', totalPages, 'Total items:', this.pagination.totalItems, 'Items per page:', this.selectedItemsPerPage);
    return totalPages;
  }

  onCategoryChange(categoryId: number | undefined): void {
    this.selectedCategoryId = categoryId;
    this.currentPage = 1; // Reset to page 1 when category changes
    this.loadHotDealProducts(1);

    // Update URL with category parameter
    const queryParams = categoryId ? { category: categoryId } : {};
    // Note: For a complete implementation, you would use Router to update the URL
    // This requires importing Router and using router.navigate with queryParamsHandling
  }

  onFiltersChanged(filters: any): void {
    console.log('Filters changed:', filters);
    // TODO: Implement filter functionality
  }

  onFiltersApplied(): void {
    console.log('Filters applied button clicked in hot-deals component');
    // Reload products when filters are applied
    this.loadHotDealProducts(this.currentPage);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadHotDealProducts(page);
  }

  onItemsPerPageChange(event: any): void {
    const itemsPerPage = event.target ? parseInt(event.target.value, 10) : parseInt(event, 10);
    this.selectedItemsPerPage = itemsPerPage;
    this.currentPage = 1; // Reset to first page when changing items per page
    this.loadHotDealProducts(1);
  }
}