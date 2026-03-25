import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './index';
import { calculateOffers } from '../utils/offers';
import type { BasketSummary } from '../types';

const selectBasketItems = (state: RootState) => state.basket.items;

export const selectBasketSummary = createSelector(
  selectBasketItems,
  (items): BasketSummary => {
    const subTotal = parseFloat(
      items
        .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
        .toFixed(2)
    );

    const appliedOffers = calculateOffers(items);

    const totalSavings = parseFloat(
      appliedOffers.reduce((sum, o) => sum + o.saving, 0).toFixed(2)
    );

    const totalAmount = parseFloat((subTotal - totalSavings).toFixed(2));

    return { items, subTotal, appliedOffers, totalSavings, totalAmount };
  }
);
