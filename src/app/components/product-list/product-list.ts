import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ProductFilter } from '../product-filter/product-filter';

import { IProduct } from '../../models/iproduct';
import { ICategory } from '../../models/icategory';

import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-product-list',
  imports: [FormsModule, ButtonModule, RatingModule, DatePickerModule, ProductFilter],
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
        'https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/13-laptop-platinum-right-render-fy25:VP4-1260x795?fmt=png-alpha',
      price: 1200,
      quantity: 10,
      catId: 1,
    },
    {
      id: 2,
      name: 'Mouse',
      imgUrl: 'https://m.media-amazon.com/images/I/61hzuoXwjqL.jpg',
      price: 25,
      quantity: 0,
      catId: 1,
    },
    {
      id: 3,
      name: 'T-Shirt',
      imgUrl: 'https://dfcdn.defacto.com.tr/838/G7707AX_26SM_GN1255_03_01.jpg',
      price: 30,
      quantity: 1,
      catId: 2,
    },
    {
      id: 4,
      name: 'Jeans',
      imgUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPRgTlQ7f7wDP-EjgW8VYugH792X_ehbFarA&s',
      price: 70,
      quantity: 25,
      catId: 2,
    },
    {
      id: 5,
      name: 'Coffee Mug',
      imgUrl: 'https://m.media-amazon.com/images/I/61kaORLGZ5L.jpg',
      price: 12,
      quantity: 0,
      catId: 3,
    },
    {
      id: 6,
      name: 'Notebook',
      imgUrl: 'https://m.media-amazon.com/images/I/718vM+75UNL._AC_UF1000,1000_QL80_.jpg',
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

  selectedCategoryId: number = 0;
  totalBoughtPrice: number = 0;

  get filteredProducts(): IProduct[] {
    if (this.selectedCategoryId === 0) {
      return this.products;
    }

    return this.products.filter((product) => product.catId === this.selectedCategoryId);
  }

  filterByCategory(categoryId: number): void {
    this.selectedCategoryId = categoryId;
  }

  buyProduct(product: IProduct): void {
    if (product.quantity <= 0) {
      return;
    }

    product.quantity--;
    this.totalBoughtPrice += product.price;

    alert(`You bought ${product.name}`);
  }
}
