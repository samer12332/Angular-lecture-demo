import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IProduct } from '../../models/iproduct';
import { ICategory } from '../../models/icategory';

import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-product-list',
  imports: [FormsModule, ButtonModule, RatingModule, DatePickerModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  selectedDate: Date | null = null;

  productRatings: Record<number, number> = {
    1: 5,
    2: 3,
    3: 4,
    4: 4,
    5: 2,
    6: 5,
  };

  products: IProduct[] = [
    {
      id: 1,
      name: 'Laptop',
      imgUrl:
        'https://fastly.picsum.photos/id/842/200/200.jpg?hmac=RW9iEgAYLKwoinQWSz_zrZHyOwmVEgqvoZTPebkRGMM',
      price: 1200,
      quantity: 10,
      catId: 1,
    },
    {
      id: 2,
      name: 'Mouse',
      imgUrl: 'https://picsum.photos/200?random=2',
      price: 25,
      quantity: 0,
      catId: 1,
    },
    {
      id: 3,
      name: 'T-Shirt',
      imgUrl: 'https://picsum.photos/200?random=3',
      price: 30,
      quantity: 1,
      catId: 2,
    },
    {
      id: 4,
      name: 'Jeans',
      imgUrl: 'https://picsum.photos/200?random=4',
      price: 70,
      quantity: 25,
      catId: 2,
    },
    {
      id: 5,
      name: 'Coffee Mug',
      imgUrl: 'https://picsum.photos/200?random=5',
      price: 12,
      quantity: 0,
      catId: 3,
    },
    {
      id: 6,
      name: 'Notebook',
      imgUrl: 'https://picsum.photos/200?random=6',
      price: 8,
      quantity: 100,
      catId: 3,
    },
  ];

  categories: ICategory[] = [
    {
      id: 1,
      name: 'Electronics',
    },
    {
      id: 2,
      name: 'Clothing',
    },
    {
      id: 3,
      name: 'Stationery',
    },
  ];

  getCategoryName(catId: number): string {
    const category = this.categories.find((cat) => cat.id === catId);

    return category ? category.name : 'Unknown';
  }

  buyProduct(productName: string): void {
    alert(`You selected ${productName}`);
  }
}
