import { Component, Output, EventEmitter } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './filter-sidebar.component.html',
  styleUrls: ['./filter-sidebar.component.scss']
})
export class FilterSidebarComponent {
  filters = [
    'Price Range',
    'Colors',
    'Reviews',
    'Graphics',
    'Guarantee',
    'Internal Storage',
    'Operating System',
    'Processor',
    'RAM',
    'Screen Size',
    'TouchScreen',
    'Type'
  ];

  
}