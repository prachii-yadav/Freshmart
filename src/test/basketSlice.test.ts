import { describe, it, expect } from 'vitest';
import reducer, {
  addItem,
  incrementItem,
  decrementItem,
  removeItem,
  clearBasket,
} from '../store/basketSlice';
import type { Product } from '../types';

const bread: Product = { id: 'bread', name: 'Bread', price: 1.1 };
const milk: Product = { id: 'milk', name: 'Milk', price: 0.5 };

describe('basketSlice', () => {
  it('starts with empty basket', () => {
    expect(reducer(undefined, { type: '@@INIT' }).items).toEqual([]);
  });

  it('adds a new item', () => {
    const state = reducer(undefined, addItem(bread));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(1);
  });

  it('increments quantity when adding existing item', () => {
    let state = reducer(undefined, addItem(bread));
    state = reducer(state, addItem(bread));
    expect(state.items[0].quantity).toBe(2);
  });

  it('increments item quantity', () => {
    let state = reducer(undefined, addItem(bread));
    state = reducer(state, incrementItem('bread'));
    expect(state.items[0].quantity).toBe(2);
  });

  it('decrements item quantity', () => {
    let state = reducer(undefined, addItem(bread));
    state = reducer(state, incrementItem('bread'));
    state = reducer(state, decrementItem('bread'));
    expect(state.items[0].quantity).toBe(1);
  });

  it('removes item when quantity hits 0 via decrement', () => {
    let state = reducer(undefined, addItem(bread));
    state = reducer(state, decrementItem('bread'));
    expect(state.items).toHaveLength(0);
  });

  it('removes item by id', () => {
    let state = reducer(undefined, addItem(bread));
    state = reducer(state, addItem(milk));
    state = reducer(state, removeItem('bread'));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].product.id).toBe('milk');
  });

  it('clears the basket', () => {
    let state = reducer(undefined, addItem(bread));
    state = reducer(state, addItem(milk));
    state = reducer(state, clearBasket());
    expect(state.items).toHaveLength(0);
  });
});
