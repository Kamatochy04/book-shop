import { createContext, useContext, useMemo, useState } from 'react';
import type { Book, CartItem } from '../types/book';

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: number) => void;
  updateQuantity: (bookId: number, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = 'bookly-cart';

const readInitialCart = (): CartItem[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as CartItem[]) : [];
  } catch {
    return [];
  }
};

const saveCart = (items: CartItem[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readInitialCart);

  const commit = (nextItems: CartItem[]) => {
    setItems(nextItems);
    saveCart(nextItems);
  };

  const addToCart = (book: Book) => {
    const existing = items.find((item) => item.book.id === book.id);
    const nextItems = existing
      ? items.map((item) =>
          item.book.id === book.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      : [...items, { book, quantity: 1 }];

    commit(nextItems);
  };

  const removeFromCart = (bookId: number) => {
    commit(items.filter((item) => item.book.id !== bookId));
  };

  const updateQuantity = (bookId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
      return;
    }

    commit(items.map((item) => (item.book.id === bookId ? { ...item, quantity } : item)));
  };

  const clearCart = () => commit([]);

  const value = useMemo(
    () => ({
      items,
      totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: items.reduce((sum, item) => sum + item.book.price * item.quantity, 0),
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }),
    [items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }

  return context;
}
