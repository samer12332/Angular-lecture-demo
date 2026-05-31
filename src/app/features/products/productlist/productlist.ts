import { Component } from '@angular/core';
import { IProduct } from '../../../models/iproduct';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-productlist',
  imports: [CommonModule, FormsModule, DatePickerModule, RatingModule],
  templateUrl: './productlist.html',
  styleUrl: './productlist.css',
})
export class Productlist {
  selectedDate: Date | null = null;
  productRatings: Record<number, number> = {
    1: 5,
    2: 4,
    3: 3,
    4: 4,
    5: 5,
  };
  products: IProduct[] = [
    {
      id: 1,
      name: 'Laptop',
      imageUrl: 'https://picsum.photos/200?random=1',
      price: 25000,
      quantity: 8,
      catId: 1,
    },
    {
      id: 2,
      name: 'Wireless Mouse',
      imageUrl: 'https://picsum.photos/200?random=2',
      price: 450,
      quantity: 25,
      catId: 1,
    },
    {
      id: 3,
      name: 'Headphones',
      imageUrl: 'https://picsum.photos/200?random=3',
      price: 1200,
      quantity: 14,
      catId: 2,
    },
    {
      id: 4,
      name: 'Keyboard',
      imageUrl: 'https://picsum.photos/200?random=4',
      price: 900,
      quantity: 10,
      catId: 2,
    },
    {
      id: 5,
      name: 'Smart Watch',
      imageUrl: 'https://picsum.photos/200?random=5',
      price: 3200,
      quantity: 6,
      catId: 3,
    },
  ];
}
