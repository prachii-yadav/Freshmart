import { describe, it, expect } from 'vitest';
import { calculateOffers, getItemSaving, formatPrice } from '../utils/offers';
import type { BasketItem } from '../types';

const makeItem = (id: string, name: string, price: number, quantity: number): BasketItem => ({
  product: { id, name, price },
  quantity,
});

describe('calculateOffers', () => {
  it('returns no offers for empty basket', () => {
    expect(calculateOffers([])).toEqual([]);
  });

  it('gives one free cheese when buying 2 cheeses', () => {
    const items = [makeItem('cheese', 'Cheese', 0.9, 2)];
    const offers = calculateOffers(items);
    expect(offers).toHaveLength(1);
    expect(offers[0].saving).toBe(0.9);
    expect(offers[0].description).toMatch(/Cheese/);
  });

  it('gives two free cheeses when buying 4 cheeses', () => {
    const items = [makeItem('cheese', 'Cheese', 0.9, 4)];
    const offers = calculateOffers(items);
    expect(offers[0].saving).toBe(1.8);
  });

  it('gives half price bread when buying 1 soup and 1 bread', () => {
    const items = [
      makeItem('soup', 'Soup', 0.6, 1),
      makeItem('bread', 'Bread', 1.1, 1),
    ];
    const offers = calculateOffers(items);
    const breadOffer = offers.find((o) => o.description.includes('Bread'));
    expect(breadOffer?.saving).toBe(0.55);
  });

  it('limits half price bread to number of soups', () => {
    const items = [
      makeItem('soup', 'Soup', 0.6, 1),
      makeItem('bread', 'Bread', 1.1, 3),
    ];
    const offers = calculateOffers(items);
    const breadOffer = offers.find((o) => o.description.includes('Bread'));
    expect(breadOffer?.saving).toBe(0.55); // only 1 soup → 1 half-price bread
  });

  it('gives a third off butter', () => {
    const items = [makeItem('butter', 'Butter', 1.2, 1)];
    const offers = calculateOffers(items);
    const butterOffer = offers.find((o) => o.description.includes('Butter'));
    expect(butterOffer?.saving).toBe(0.4);
  });

  it('gives a third off butter per unit', () => {
    const items = [makeItem('butter', 'Butter', 1.2, 3)];
    const offers = calculateOffers(items);
    const butterOffer = offers.find((o) => o.description.includes('Butter'));
    expect(butterOffer?.saving).toBeCloseTo(1.2, 2);
  });

  it('applies all three offers simultaneously', () => {
    const items = [
      makeItem('cheese', 'Cheese', 0.9, 2),
      makeItem('soup', 'Soup', 0.6, 1),
      makeItem('bread', 'Bread', 1.1, 1),
      makeItem('butter', 'Butter', 1.2, 1),
    ];
    const offers = calculateOffers(items);
    expect(offers).toHaveLength(3);
    const total = offers.reduce((s, o) => s + o.saving, 0);
    expect(parseFloat(total.toFixed(2))).toBe(1.85); // 0.90 + 0.55 + 0.40
  });

  it('no bread offer if no soup in basket', () => {
    const items = [makeItem('bread', 'Bread', 1.1, 3)];
    const offers = calculateOffers(items);
    expect(offers.find((o) => o.description.includes('Bread'))).toBeUndefined();
  });
});

describe('getItemSaving', () => {
  it('returns 0 for product with no matching offer', () => {
    const offers = [{ description: 'Buy 1 Cheese get 1 free (x1)', saving: 0.9 }];
    expect(getItemSaving('milk', offers)).toBe(0);
  });

  it('returns saving for matching product', () => {
    const offers = [{ description: 'Buy 1 Cheese get 1 free (x1)', saving: 0.9 }];
    expect(getItemSaving('cheese', offers)).toBe(0.9);
  });
});

describe('formatPrice', () => {
  it('formats correctly', () => {
    expect(formatPrice(1.1)).toBe('£1.10');
    expect(formatPrice(0.5)).toBe('£0.50');
    expect(formatPrice(4.15)).toBe('£4.15');
  });
});
