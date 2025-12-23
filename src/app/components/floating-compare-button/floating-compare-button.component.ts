import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ComparisonService } from '../../services/comparison.service';

@Component({
  selector: 'app-floating-compare-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Floating Compare Button -->
    <div class="fixed bottom-6 left-6 z-50">
      <button 
        (click)="goToComparePage()"
        class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-4 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 flex items-center justify-center w-14 h-14 relative">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <span *ngIf="comparisonCount > 0" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
          {{ comparisonCount }}
        </span>
      </button>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class FloatingCompareButtonComponent implements OnInit {
  comparisonCount = 0;

  constructor(
    private router: Router,
    private comparisonService: ComparisonService
  ) {}

  ngOnInit(): void {
    this.comparisonService.comparison$.subscribe(products => {
      this.comparisonCount = products.length;
    });
  }

  goToComparePage(): void {
    this.router.navigate(['/compare']);
  }
}