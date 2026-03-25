import { useEffect, useRef } from 'react';
import { AppBar, Toolbar, Typography, Badge, Container } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ProductList from './components/ProductList';
import Basket from './components/Basket';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { selectBasketSummary } from './store/selectors';
import { setItems } from './store/basketSlice';
import { saveBasket, loadBasket } from './services/firestoreService';

export default function App() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(selectBasketSummary);
  const totalQty = items.reduce((s, i) => s + i.quantity, 0);
  const isFirstLoad = useRef(true);

  // Load basket from Firestore on startup
  useEffect(() => {
    loadBasket().then((savedItems) => {
      if (savedItems.length > 0) dispatch(setItems(savedItems));
    });
  }, [dispatch]);

  // Save basket to Firestore whenever items change (skip first load)
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    saveBasket(items);
  }, [items]);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Top AppBar */}
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'white', borderBottom: '1px solid #e2e8f0' }}>
        <Toolbar className="justify-between">
          <div className="flex items-center gap-2">
            <StorefrontIcon sx={{ color: 'primary.main' }} />
            <Typography variant="h6" fontWeight={800} color="text.primary">
              FreshMart
            </Typography>
          </div>
          <Badge badgeContent={totalQty} color="primary" showZero>
            <ShoppingCartIcon sx={{ color: 'text.secondary' }} />
          </Badge>
        </Toolbar>
      </AppBar>

      {/* Main layout */}
      <Container maxWidth="lg" sx={{ pt: 2, pb: 1 }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 items-start">
          <ProductList />
          <Basket />
        </div>
      </Container>
    </div>
  );
}
