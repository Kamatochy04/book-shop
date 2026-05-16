import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/format';
import type { Book } from '../types/book';

export function BookCard({ book }: { book: Book }) {
  const { addToCart } = useCart();

  return (
    <article className="group overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-stone-100">
      <Link to={`/books/${book.slug}`} className="block overflow-hidden bg-stone-100">
        <img
          src={book.coverUrl}
          alt={book.title}
          className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="space-y-4 p-5">
        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">{book.category}</span>
            <span className="flex items-center gap-1 text-sm font-semibold text-stone-600">
              <Star className="fill-orange-400 text-orange-400" size={16} />
              {book.rating}
            </span>
          </div>
          <Link to={`/books/${book.slug}`} className="line-clamp-2 text-lg font-black text-ink hover:text-coffee">
            {book.title}
          </Link>
          <p className="mt-1 text-sm text-stone-500">{book.author}</p>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xl font-black">{formatPrice(book.price)}</p>
            {book.oldPrice && <p className="text-sm text-stone-400 line-through">{formatPrice(book.oldPrice)}</p>}
          </div>
          <button
            type="button"
            onClick={() => addToCart(book)}
            className="rounded-full bg-ink p-3 text-white hover:bg-coffee"
            aria-label={`Добавить ${book.title} в корзину`}
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </article>
  );
}
