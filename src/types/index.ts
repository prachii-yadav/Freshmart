export interface Product {
  id: string;
  name: string;
  price: number; // in pounds
}

export interface BasketItem {
  product: Product;
  quantity: number;
}

export interface AppliedOffer {
  description: string;
  saving: number;
}

export interface BasketSummary {
  items: BasketItem[];
  subTotal: number;
  appliedOffers: AppliedOffer[];
  totalSavings: number;
  totalAmount: number;
}
