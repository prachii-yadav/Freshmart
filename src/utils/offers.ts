import type { BasketItem, AppliedOffer } from '../types';

/**
 * Special offers:
 * 1. Buy a Cheese, get a second Cheese free (BOGOF)
 * 2. Buy a Soup, get a half price Bread (one half-price bread per soup)
 * 3. Get a third off Butter
 */
export function calculateOffers(items: BasketItem[]): AppliedOffer[] {
  const offers: AppliedOffer[] = [];

  const get = (id: string) => items.find((i) => i.product.id === id);

  // Offer 1: Buy a Cheese, get a second Cheese free
  const cheese = get('cheese');
  if (cheese && cheese.quantity >= 2) {
    const freeCount = Math.floor(cheese.quantity / 2);
    const saving = parseFloat((freeCount * cheese.product.price).toFixed(2));
    offers.push({
      description: `Buy 1 Cheese get 1 free (x${freeCount})`,
      saving,
    });
  }

  // Offer 2: Buy a Soup, get a half price Bread
  const soup = get('soup');
  const bread = get('bread');
  if (soup && bread) {
    const halfPriceCount = Math.min(soup.quantity, bread.quantity);
    if (halfPriceCount > 0) {
      const saving = parseFloat(
        (halfPriceCount * bread.product.price * 0.5).toFixed(2)
      );
      offers.push({
        description: `Half price Bread with Soup (x${halfPriceCount})`,
        saving,
      });
    }
  }

  // Offer 3: Get a third off Butter
  const butter = get('butter');
  if (butter) {
    const saving = parseFloat(
      (butter.quantity * butter.product.price * (1 / 3)).toFixed(2)
    );
    if (saving > 0) {
      offers.push({
        description: `One third off Butter (x${butter.quantity})`,
        saving,
      });
    }
  }

  return offers;
}

/**
 * Returns per-item saving (in pounds) attributable to offers for a given product.
 * Used by the basket UI to show savings inline per item row.
 */
export function getItemSaving(
  productId: string,
  offers: AppliedOffer[]
): number {
  const map: Record<string, string[]> = {
    cheese: ['Buy 1 Cheese get 1 free'],
    bread: ['Half price Bread with Soup'],
    butter: ['One third off Butter'],
  };
  const prefixes = map[productId] ?? [];
  return offers
    .filter((o) => prefixes.some((p) => o.description.startsWith(p)))
    .reduce((sum, o) => sum + o.saving, 0);
}

export function formatPrice(value: number): string {
  return `£${value.toFixed(2)}`;
}
