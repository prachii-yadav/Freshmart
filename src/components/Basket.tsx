import {
  Box, Card, CardContent, Typography, Divider,
  Stack, Button, Paper, Chip,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CelebrationIcon from '@mui/icons-material/Celebration';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectBasketSummary } from '../store/selectors';
import { clearBasket } from '../store/basketSlice';
import BasketItemRow from './BasketItem';
import { formatPrice } from '../utils/offers';

export default function Basket() {
  const dispatch = useAppDispatch();
  const { items, subTotal, appliedOffers, totalSavings, totalAmount } =
    useAppSelector(selectBasketSummary);

  return (
    <Card elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: 3 }}>
      <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>

        {/* Header */}
        <Box sx={{ px: 3, py: 2, borderBottom: '1px solid #f1f5f9' }} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCartIcon sx={{ color: 'primary.main', fontSize: 22 }} />
            <Typography variant="h6" fontWeight={700}>Basket</Typography>
          </div>
          {items.length > 0 && (
            <Button
              size="small"
              startIcon={<DeleteOutlineIcon />}
              onClick={() => dispatch(clearBasket())}
              color="error"
              variant="text"
              sx={{ fontSize: 12, textTransform: 'none' }}
            >
              Clear all
            </Button>
          )}
        </Box>

        {/* Empty state */}
        {items.length === 0 ? (
          <Box sx={{ py: 8, px: 3 }} className="text-center">
            <Typography fontSize={56} sx={{ opacity: 0.3, mb: 1 }}>🛒</Typography>
            <Typography fontWeight={600} color="text.secondary">Your basket is empty</Typography>
            <Typography variant="body2" color="text.disabled" mt={0.5}>
              Add some products from the left panel
            </Typography>
          </Box>
        ) : (
          <>
            {/* Items */}
            <Box sx={{ px: 3 }}>
              {items.map((item, idx) => (
                <Box key={item.product.id}>
                  <BasketItemRow item={item} offers={appliedOffers} />
                  {idx < items.length - 1 && <Divider />}
                </Box>
              ))}
            </Box>

            {/* Summary */}
            <Box sx={{ px: 3, pb: 3, pt: 1 }}>
              <Divider sx={{ mb: 2 }} />

              {/* Subtotal */}
              <div className="flex justify-between items-center mb-3">
                <Typography color="text.secondary" fontSize={14}>Subtotal</Typography>
                <Typography fontWeight={600} fontSize={14}>{formatPrice(subTotal)}</Typography>
              </div>

              {/* Applied offers */}
              {appliedOffers.length > 0 && (
                <Paper
                  elevation={0}
                  sx={{ bgcolor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 2, p: 2, mb: 1.5 }}
                >
                  <div className="flex items-center gap-1 mb-2">
                    <CelebrationIcon sx={{ color: '#16a34a', fontSize: 16 }} />
                    <Typography variant="caption" fontWeight={700} color="#15803d" sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      Offers Applied
                    </Typography>
                  </div>
                  <Stack spacing={0.75}>
                    {appliedOffers.map((offer) => (
                      <div key={offer.description} className="flex justify-between items-center">
                        <Typography variant="body2" color="#166534" sx={{ fontSize: 13 }}>{offer.description}</Typography>
                        <Typography variant="body2" fontWeight={700} color="error.main" sx={{ fontSize: 13, ml: 1, flexShrink: 0 }}>
                          −{formatPrice(offer.saving)}
                        </Typography>
                      </div>
                    ))}
                  </Stack>
                </Paper>
              )}

              {/* Total savings row */}
              {totalSavings > 0 && (
                <div className="flex justify-between items-center mb-4">
                  <Typography color="text.secondary" fontSize={14}>Total Savings</Typography>
                  <Typography fontWeight={700} color="error.main" fontSize={14}>
                    −{formatPrice(totalSavings)}
                  </Typography>
                </div>
              )}

              {/* Total banner */}
              <Box sx={{ background: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)', borderRadius: 2, px: 3, py: 2 }} className="flex justify-between items-center">
                <Typography color="rgba(255,255,255,0.85)" fontWeight={600}>Total</Typography>
                <Typography color="white" fontWeight={800} fontSize={22}>
                  {formatPrice(totalAmount)}
                </Typography>
              </Box>

              {/* Savings callout */}
              {totalSavings > 0 && (
                <div className="mt-3 text-center">
                  <Chip
                    icon={<CelebrationIcon />}
                    label={`You saved ${formatPrice(totalSavings)} with today's offers!`}
                    size="small"
                    sx={{ bgcolor: '#f0fdf4', color: '#15803d', fontWeight: 600, border: '1px solid #bbf7d0' }}
                  />
                </div>
              )}
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
}
