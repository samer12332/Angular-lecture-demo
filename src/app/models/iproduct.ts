export interface IProduct {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  catId: number;
  rating?: number;
}
