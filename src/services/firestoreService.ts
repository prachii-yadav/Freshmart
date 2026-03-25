import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import type { BasketItem } from '../types';

const BASKET_DOC = doc(db, 'baskets', 'current');

export async function saveBasket(items: BasketItem[]): Promise<void> {
  await setDoc(BASKET_DOC, {
    items: items.map((i) => ({
      product: i.product,
      quantity: i.quantity,
    })),
    updatedAt: serverTimestamp(),
  });
}

export async function loadBasket(): Promise<BasketItem[]> {
  const snap = await getDoc(BASKET_DOC);
  if (!snap.exists()) return [];
  return snap.data().items as BasketItem[];
}
