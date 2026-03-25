import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { BasketItem, Product } from '../types';

interface BasketState {
  items: BasketItem[];
}

const initialState: BasketState = {
  items: [],
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Product>) {
      const existing = state.items.find(
        (item) => item.product.id === action.payload.id
      );
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
    },
    incrementItem(state, action: PayloadAction<string>) {
      const item = state.items.find((i) => i.product.id === action.payload);
      if (item) item.quantity += 1;
    },
    decrementItem(state, action: PayloadAction<string>) {
      const idx = state.items.findIndex((i) => i.product.id === action.payload);
      if (idx === -1) return;
      if (state.items[idx].quantity <= 1) {
        state.items.splice(idx, 1);
      } else {
        state.items[idx].quantity -= 1;
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.product.id !== action.payload);
    },
    clearBasket(state) {
      state.items = [];
    },
    setItems(state, action: PayloadAction<BasketItem[]>) {
      state.items = action.payload;
    },
  },
});

export const { addItem, incrementItem, decrementItem, removeItem, clearBasket, setItems } =
  basketSlice.actions;

export default basketSlice.reducer;
