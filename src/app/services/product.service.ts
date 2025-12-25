import { Injectable } from '@angular/core';
import { Observable, of, catchError, map } from 'rxjs';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private http: HttpClient) { }

  private products: Product[] = [
    {
      id: 1,
      name: 'Wireless Headphones',
      description:
        'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
      price: 99.99,
      category: 'Electronics',
      imageUrl: 'assets/images/pick1.png',
      rating: 4.5,
      reviewsCount: 128,
      isFeatured: true,
    },
    {
      id: 2,
      name: 'Smart Watch',
      description: 'Feature-rich smartwatch with health monitoring and waterproof design.',
      price: 199.99,
      category: 'Electronics',
      imageUrl: 'assets/images/pick2.png',
      rating: 4.2,
      reviewsCount: 97,
      isNew: true,
    },
    {
      id: 3,
      name: 'Bluetooth Speaker',
      description: 'Portable Bluetooth speaker with excellent sound quality and 12-hour battery.',
      price: 79.99,
      category: 'Audio',
      imageUrl: 'assets/images/pick3.png',
      rating: 4.0,
      reviewsCount: 64,
    },
    {
      id: 4,
      name: 'Gaming Mouse',
      description: 'Ergonomic gaming mouse with customizable buttons and RGB lighting.',
      price: 49.99,
      category: 'Accessories',
      imageUrl: 'assets/images/pick4.png',
      rating: 4.7,
      reviewsCount: 215,
      isFeatured: true,
    },
    {
      id: 5,
      name: 'Mechanical Keyboard',
      description: 'RGB mechanical keyboard with programmable keys and anti-ghosting.',
      price: 129.99,
      category: 'Accessories',
      imageUrl: 'assets/images/pick5.png',
      rating: 4.8,
      reviewsCount: 189,
      isNew: true,
    },
    {
      id: 6,
      name: 'External SSD',
      description: 'Fast external SSD with 1TB storage capacity and USB 3.2 Gen 2.',
      price: 149.99,
      category: 'Storage',
      imageUrl: 'assets/images/pick6.png',
      rating: 4.3,
      reviewsCount: 76,
    },
  ];

  getProducts(): Observable<Product[]> {
    if (environment.useLocalData) {
      // Use local data when environment is configured to do so
      return of(this.products);
    }
    
    // Using API data with local data as fallback
    return this.http.get<any>(`${environment.apiUrl}/getItems`).pipe(
      map(response => {
        if (response && response.response && response.response.data && response.response.data.data) {
          // Map API response to Product model
          return response.response.data.data.map((item: any) => ({
            id: this.generateIdFromString(item.id || ''),
            name: item.title || 'Unknown Product',
            description: item.longDescription || 'No description available',
            price: item.price && item.price.length > 0 ? item.price[0].amount : 0,
            category: item.categoryId ? `Category ${item.categoryId}` : 'Uncategorized',
            imageUrl: item.images && item.images.additional_images && item.images.additional_images.length > 0 
              ? item.images.additional_images[0] 
              : 'assets/images/placeholder.png',
            rating: item.overAllRating || 0,
            reviewsCount: 0, // API doesn't provide reviews count
            isFeatured: item.isFavourite || false,
            isNew: item.condition === 'New'
          }));
        }
        return this.products; // Fallback to local data if API structure is unexpected
      }),
      catchError(error => {
        console.error('Error fetching products from API, using local data instead:', error);
        return of(this.products);
      })
    );
  }

  private generateIdFromString(str: string): number {
    // Generate a numeric ID from string by summing character codes
    return str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
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

  getHotDealsItems(pageNo: number = 1, perPage: number = 12, categoryId?: number): Observable<{products: Product[], pagination: {pageNo: number, perPage: number, totalItems: number, selectedItems: number}}> {
    if (environment.useLocalData) {
      // Use local data when environment is configured to do so
      const totalItems = this.products.length;
      const startIndex = (pageNo - 1) * perPage;
      const endIndex = startIndex + perPage;
      const selectedItems = Math.min(perPage, totalItems - startIndex);
      const paginatedProducts = this.products.slice(startIndex, endIndex);
      
      return of({
        products: paginatedProducts,
        pagination: {
          pageNo: pageNo,
          perPage: perPage,
          totalItems: totalItems,
          selectedItems: selectedItems
        }
      });
    }
    
    // Build query parameters
    let params: any = {
      pageNo: pageNo,
      perPage: perPage
    };
    
    if (categoryId !== undefined) {
      params.categoryId = categoryId;
    }
    
    // Using API data with local data as fallback
    return this.http.get<any>(`${environment.apiUrl}/getItems`, { params }).pipe(
      map(response => {
        if (response && response.response && response.response.data && response.response.data.data) {
          // Debug API response
          console.log('API Response:', response);
          console.log('API Pagination Data:', response.response.data.pagination);
          
          // Map API response to Product model
          let products = response.response.data.data.map((item: any) => ({
            id: this.generateIdFromString(item.id || ''),
            name: item.title || 'Unknown Product',
            description: item.longDescription || 'No description available',
            price: item.price && item.price.length > 0 ? item.price[0].amount : 0,
            category: item.categoryId ? `Category ${item.categoryId}` : 'Uncategorized',
            imageUrl: item.images && item.images.additional_images && item.images.additional_images.length > 0 
              ? item.images.additional_images[0] 
              : 'assets/images/placeholder.png',
            rating: item.overAllRating || 0,
            reviewsCount: 0, // API doesn't provide reviews count
            isFeatured: item.isFavourite || false,
            isNew: item.condition === 'New'
          }));

          // Calculate pagination from API response
          const apiPagination = response.response.data.pagination;
          console.log('API Pagination:', apiPagination);
          
          // Simulate having 936 total items for pagination demonstration
          const simulatedTotalItems = 936;
          
          const pagination = {
            pageNo: apiPagination?.pageNo || pageNo,
            perPage: apiPagination?.perPage || perPage,
            totalItems: simulatedTotalItems, // Use simulated total instead of actual
            selectedItems: Math.min(perPage, products.length)
          };
          
          console.log('Calculated Pagination:', pagination);

          return {
            products: products,
            pagination: {
              pageNo: pagination.pageNo,
              perPage: pagination.perPage,
              totalItems: pagination.totalItems,
              selectedItems: pagination.selectedItems
            }
          };
        }
        
        // Fallback to local data if API structure is unexpected
        const totalItems = this.products.length;
        const startIndex = (pageNo - 1) * perPage;
        const endIndex = startIndex + perPage;
        const selectedItems = Math.min(perPage, totalItems - startIndex);
        const paginatedProducts = this.products.slice(startIndex, endIndex);
        
        return {
          products: paginatedProducts,
          pagination: {
            pageNo: pageNo,
            perPage: perPage,
            totalItems: totalItems,
            selectedItems: selectedItems
          }
        };
      }),
      catchError(error => {
        console.error('Error fetching products from API, using local data instead:', error);
        
        // Fallback to local data if API fails
        const totalItems = this.products.length;
        const startIndex = (pageNo - 1) * perPage;
        const endIndex = startIndex + perPage;
        const selectedItems = Math.min(perPage, totalItems - startIndex);
        const paginatedProducts = this.products.slice(startIndex, endIndex);
        
        return of({
          products: paginatedProducts,
          pagination: {
            pageNo: pageNo,
            perPage: perPage,
            totalItems: totalItems,
            selectedItems: selectedItems
          }
        });
      })
    );
  }
}