import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ICategory } from '../../models/icategory';

@Component({
  selector: 'app-product-filter',
  imports: [FormsModule],
  templateUrl: './product-filter.html',
  styleUrl: './product-filter.css',
})
export class ProductFilter {
  @Input() categories: ICategory[] = [];
  @Input() totalPrice: number = 0;
  @Input() selectedCategoryId: number = 0;

  @Output() categoryChanged = new EventEmitter<number>();

  changeCategory(): void {
    this.categoryChanged.emit(Number(this.selectedCategoryId));
  }
}
