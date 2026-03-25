import {
  Box, Card, CardContent, Typography, Button, Chip,
  List, ListItem, Divider, Avatar, Paper,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { PRODUCTS } from '../data/products';
import { addItem } from '../store/basketSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { formatPrice } from '../utils/offers';

const PRODUCT_EMOJI: Record<string, string> = {
  bread: '🍞', milk: '🥛', cheese: '🧀', soup: '🍲', butter: '🧈',
};

const OFFERS = [
  { emoji: '🧀', text: 'Buy a Cheese, get a second Cheese free' },
  { emoji: '🍲', text: 'Buy a Soup, get a half price Bread' },
  { emoji: '🧈', text: 'Get a third off Butter' },
];

export default function ProductList() {
  const dispatch = useAppDispatch();
  const basketItems = useAppSelector((s) => s.basket.items);
  const getQty = (id: string) => basketItems.find((i) => i.product.id === id)?.quantity ?? 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Products Card */}
      <Card elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: 3 }}>
        <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
          {/* Header */}
          <Box sx={{ px: 3, py: 2, borderBottom: '1px solid #f1f5f9' }} className="flex items-center gap-2">
            <AddShoppingCartIcon sx={{ color: 'primary.main', fontSize: 22 }} />
            <Typography variant="h6" fontWeight={700} color="text.primary">
              Products
            </Typography>
          </Box>

          {/* Product list */}
          <List disablePadding>
            {PRODUCTS.map((product, idx) => {
              const qty = getQty(product.id);
              const inBasket = qty > 0;

              return (
                <Box key={product.id}>
                  <ListItem sx={{ px: 3, py: 2, '&:hover': { bgcolor: '#f8fafc' } }}>
                    <div className="flex items-center w-full gap-3">
                      {/* Emoji avatar */}
                      <Avatar
                        sx={{ bgcolor: '#eef2ff', width: 48, height: 48, fontSize: 24, borderRadius: 2, flexShrink: 0 }}
                      >
                        {PRODUCT_EMOJI[product.id] ?? '📦'}
                      </Avatar>

                      {/* Name + price */}
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography fontWeight={600} color="text.primary">
                          {product.name}
                        </Typography>
                        <Typography variant="body2" color="primary" fontWeight={600}>
                          {formatPrice(product.price)}
                        </Typography>
                      </Box>

                      {/* Action */}
                      {inBasket ? (
                        <div className="flex items-center gap-3 shrink-0">
                          <Chip
                            label={`×${qty} in basket`}
                            size="small"
                            sx={{ bgcolor: '#eef2ff', color: 'primary.main', fontWeight: 600, border: '1px solid #c7d2fe' }}
                          />
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => dispatch(addItem(product))}
                            sx={{ minWidth: 36, width: 36, height: 36, borderRadius: 2, p: 0 }}
                            aria-label={`Add another ${product.name}`}
                          >
                            <AddIcon fontSize="small" />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="contained"
                          size="medium"
                          startIcon={<AddIcon />}
                          onClick={() => dispatch(addItem(product))}
                          sx={{ borderRadius: 2, flexShrink: 0, fontWeight: 600, px: 2.5 }}
                          aria-label={`Add ${product.name} to basket`}
                        >
                          Add
                        </Button>
                      )}
                    </div>
                  </ListItem>
                  {idx < PRODUCTS.length - 1 && <Divider sx={{ mx: 3 }} />}
                </Box>
              );
            })}
          </List>
        </CardContent>
      </Card>

      {/* Special Offers Card */}
      <Paper
        elevation={0}
        sx={{ borderRadius: 3, border: '1px solid #fde68a', bgcolor: '#fffbeb', overflow: 'hidden' }}
      >
        {/* Header */}
        <Box sx={{ px: 3, py: 2, borderBottom: '1px solid #fde68a' }} className="flex items-center gap-2">
          <LocalOfferIcon sx={{ color: '#d97706', fontSize: 20 }} />
          <Typography fontWeight={700} color="#92400e">
            Special Offers
          </Typography>
          <Chip
            label={`${OFFERS.length} active`}
            size="small"
            sx={{ ml: 'auto', bgcolor: '#f59e0b', color: 'white', fontWeight: 700, fontSize: 11 }}
          />
        </Box>

        {/* Offers list */}
        <List disablePadding>
          {OFFERS.map((offer, idx) => (
            <Box key={offer.text}>
              <ListItem sx={{ px: 3, py: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography fontSize={20}>{offer.emoji}</Typography>
                  <Typography variant="body2" color="#78350f" fontWeight={500}>
                    {offer.text}
                  </Typography>
                </Box>
              </ListItem>
              {idx < OFFERS.length - 1 && <Divider sx={{ mx: 3, borderColor: '#fde68a' }} />}
            </Box>
          ))}
        </List>
      </Paper>
    </div>
  );
}
