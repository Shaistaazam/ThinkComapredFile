import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ComparisonService {
  private readonly MAX_COMPARE_ITEMS = 4;
  private comparisonList: Product[] = [];
  private comparisonSubject = new BehaviorSubject<Product[]>([]);
  public comparison$ = this.comparisonSubject.asObservable();

  constructor() {
    this.loadFromStorage();
  }

  addProduct(product: Product): boolean {
    // Check if product is already in comparison list
    if (this.comparisonList.some(p => p.id === product.id)) {
      return false; // Already added
    }
    
    // Check if we've reached the maximum number of items
    if (this.comparisonList.length >= this.MAX_COMPARE_ITEMS) {
      return false; // Max limit reached
    }
    
    this.comparisonList.push(product);
    this.comparisonSubject.next([...this.comparisonList]);
    this.saveToStorage();
    return true;
  }

  removeProduct(productId: number): void {
    this.comparisonList = this.comparisonList.filter(p => p.id !== productId);
    this.comparisonSubject.next([...this.comparisonList]);
    this.saveToStorage();
  }

  getComparisonList(): Product[] {
    return [...this.comparisonList];
  }

  isProductInComparison(productId: number): boolean {
    return this.comparisonList.some(p => p.id === productId);
  }

  clearComparison(): void {
    this.comparisonList = [];
    this.comparisonSubject.next([]);
    this.saveToStorage();
  }

  getMaxCompareItems(): number {
    return this.MAX_COMPARE_ITEMS;
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem('comparisonList', JSON.stringify(this.comparisonList));
    } catch (error) {
      console.error('Error saving comparison list to localStorage:', error);
    }
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem('comparisonList');
      if (stored) {
        this.comparisonList = JSON.parse(stored);
        this.comparisonSubject.next([...this.comparisonList]);
      }
    } catch (error) {
      console.error('Error loading comparison list from localStorage:', error);
      this.comparisonList = [];
    }
  }
}