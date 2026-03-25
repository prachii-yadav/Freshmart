import { Box, Typography, Avatar, IconButton, Chip, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SellIcon from '@mui/icons-material/Sell';
import type { BasketItem as BasketItemType, AppliedOffer } from '../types';
import { incrementItem, decrementItem } from '../store/basketSlice';
import { useAppDispatch } from '../store/hooks';
import { formatPrice, getItemSaving } from '../utils/offers';

const PRODUCT_EMOJI: Record<string, string> = {
  bread: '🍞', milk: '🥛', cheese: '🧀', soup: '🍲', butter: '🧈',
};

interface Props {
  item: BasketItemType;
  offers: AppliedOffer[];
}

export default function BasketItemRow({ item, offers }: Props) {
  const dispatch = useAppDispatch();
  const { product, quantity } = item;
  const linePrice = parseFloat((product.price * quantity).toFixed(2));
  const saving = getItemSaving(product.id, offers);
  const itemCost = parseFloat((linePrice - saving).toFixed(2));

  return (
    <Box sx={{ py: 2 }}>
      <div className="flex items-start gap-3">
        {/* Emoji avatar */}
        <Avatar sx={{ bgcolor: '#eef2ff', width: 44, height: 44, fontSize: 22, borderRadius: 2, mt: 0.5, flexShrink: 0 }}>
          {PRODUCT_EMOJI[product.id] ?? '📦'}
        </Avatar>

        {/* Middle: name + breakdown */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <div className="flex justify-between items-center">
            <Typography fontWeight={600} color="text.primary">{product.name}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1, flexShrink: 0 }}>
              {formatPrice(product.price)}
            </Typography>
          </div>

          <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mt: 0.25 }}>
            {formatPrice(product.price)} × {quantity} ={' '}
            <Box component="span" sx={{ color: 'text.secondary', fontWeight: 600 }}>
              {formatPrice(linePrice)}
            </Box>
          </Typography>

          {saving > 0 && (
            <Chip
              icon={<SellIcon sx={{ fontSize: '13px !important' }} />}
              label={`Saving ${formatPrice(saving)}`}
              size="small"
              sx={{ mt: 0.75, bgcolor: '#fff1f2', color: '#e11d48', fontWeight: 700, fontSize: 11, border: '1px solid #fecdd3', height: 22 }}
            />
          )}
        </Box>

        {/* Right: stepper + cost */}
        <Stack alignItems="flex-end" spacing={1} sx={{ flexShrink: 0 }}>
          {/* Stepper */}
          <Box sx={{ bgcolor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 2, overflow: 'hidden' }} className="flex items-center">
            <IconButton
              size="small"
              onClick={() => dispatch(decrementItem(product.id))}
              sx={{ borderRadius: 0, width: 32, height: 32, color: 'text.secondary', '&:hover': { bgcolor: '#fee2e2', color: '#e11d48' } }}
              aria-label={`Decrease ${product.name}`}
            >
              <RemoveIcon sx={{ fontSize: 14 }} />
            </IconButton>
            <Typography sx={{ width: 28, textAlign: 'center', fontWeight: 700, fontSize: 14 }}>
              {quantity}
            </Typography>
            <IconButton
              size="small"
              onClick={() => dispatch(incrementItem(product.id))}
              sx={{ borderRadius: 0, width: 32, height: 32, bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' } }}
              aria-label={`Increase ${product.name}`}
            >
              <AddIcon sx={{ fontSize: 14 }} />
            </IconButton>
          </Box>

          {/* Item cost */}
          <Typography fontWeight={700} fontSize={15} color="text.primary">
            {formatPrice(itemCost)}
          </Typography>
        </Stack>
      </div>
    </Box>
  );
}
