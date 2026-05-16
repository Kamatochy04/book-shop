export type Book = {
  id: number;
  title: string;
  slug: string;
  author: string;
  description: string;
  price: number;
  oldPrice?: number;
  coverUrl: string;
  rating: number;
  reviewsCount: number;
  category: string;
  recommended: boolean;
  inStock: number;
  isbn?: string;
  publishedYear?: number;
  pages?: number;
  language?: string;
};

export type CartItem = {
  book: Book;
  quantity: number;
};

export type CheckoutPayload = {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  items: Array<{
    id: number;
    title: string;
    price: number;
    quantity: number;
  }>;
  total: number;
};
