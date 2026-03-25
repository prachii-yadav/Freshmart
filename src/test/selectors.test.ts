import { describe, it, expect } from 'vitest';
import { selectBasketSummary } from '../store/selectors';
import type { RootState } from '../store';
import type { BasketItem } from '../types';

const makeState = (items: BasketItem[]): RootState =>
  ({ basket: { items } } as RootState);

describe('selectBasketSummary', () => {
  it('returns zero values for empty basket', () => {
    const summary = selectBasketSummary(makeState([]));
    expect(summary.subTotal).toBe(0);
    expect(summary.totalSavings).toBe(0);
    expect(summary.totalAmount).toBe(0);
    expect(summary.appliedOffers).toEqual([]);
  });

  it('calculates correct totals for sample basket (Soup x1, Bread x3, Butter x1)', () => {
    // Matches the screenshot: Soup £0.60, Bread £1.10 x3, Butter £1.20
    // SubTotal = 0.60 + 3.30 + 1.20 = 5.10
    // Offers: half-price bread (0.55), third-off butter (0.40) = 0.95 savings
    // Total = 4.15
    const items: BasketItem[] = [
      { product: { id: 'soup', name: 'Soup', price: 0.6 }, quantity: 1 },
      { product: { id: 'bread', name: 'Bread', price: 1.1 }, quantity: 3 },
      { product: { id: 'butter', name: 'Butter', price: 1.2 }, quantity: 1 },
    ];
    const summary = selectBasketSummary(makeState(items));
    expect(summary.subTotal).toBe(5.1);
    expect(summary.totalSavings).toBe(0.95);
    expect(summary.totalAmount).toBe(4.15);
  });
});
