import { mockBooks } from '../data/mockBooks';
import type { Book, CheckoutPayload } from '../types/book';

const API_URL = import.meta.env.VITE_STRAPI_URL ?? 'http://localhost:1340';

type StrapiEntity<T> = {
  id: number;
  attributes: T;
};

type StrapiListResponse<T> = {
  data: Array<StrapiEntity<T>>;
};

type BookAttributes = Omit<Book, 'id'>;

const normalizeBook = ({ id, attributes }: StrapiEntity<BookAttributes>): Book => ({
  id,
  ...attributes,
  price: Number(attributes.price),
  oldPrice: attributes.oldPrice ? Number(attributes.oldPrice) : undefined,
  rating: Number(attributes.rating),
});

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getBooks(): Promise<Book[]> {
  try {
    const response = await request<StrapiListResponse<BookAttributes>>(
      '/api/books?sort=title:asc&pagination[pageSize]=100',
    );
    return response.data.map(normalizeBook);
  } catch {
    return mockBooks;
  }
}

export async function getRecommendedBooks(): Promise<Book[]> {
  const books = await getBooks();
  return books.filter((book) => book.recommended);
}

export async function getBookBySlug(slug: string): Promise<Book | undefined> {
  try {
    const response = await request<StrapiListResponse<BookAttributes>>(
      `/api/books?filters[slug][$eq]=${encodeURIComponent(slug)}`,
    );
    return response.data[0] ? normalizeBook(response.data[0]) : undefined;
  } catch {
    return mockBooks.find((book) => book.slug === slug);
  }
}

export async function login(identifier: string, password: string) {
  return request<{ jwt: string; user: { id: number; username: string; email: string } }>('/api/auth/local', {
    method: 'POST',
    body: JSON.stringify({ identifier, password }),
  });
}

export async function register(username: string, email: string, password: string) {
  return request<{ jwt: string; user: { id: number; username: string; email: string } }>('/api/auth/local/register', {
    method: 'POST',
    body: JSON.stringify({ username, email, password }),
  });
}

export async function createOrder(payload: CheckoutPayload, token?: string) {
  return request('/api/orders', {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: JSON.stringify({ data: payload }),
  });
}
