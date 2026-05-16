import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ShoppingCart, Star } from 'lucide-react';
import { BookCard } from '../components/BookCard';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/format';
import { getBookBySlug, getRecommendedBooks } from '../lib/api';
import type { Book } from '../types/book';

export function BookPage() {
  const { slug = '' } = useParams();
  const { addToCart } = useCart();
  const [book, setBook] = useState<Book | undefined>();
  const [recommended, setRecommended] = useState<Book[]>([]);

  useEffect(() => {
    getBookBySlug(slug).then(setBook);
    getRecommendedBooks().then(setRecommended);
  }, [slug]);

  if (!book) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Link to="/catalog" className="inline-flex items-center gap-2 font-bold text-coffee">
          <ArrowLeft size={18} /> Вернуться в каталог
        </Link>
        <div className="mt-8 rounded-3xl bg-white p-10 shadow-soft">Книга не найдена.</div>
      </section>
    );
  }

  const details = [
    ['Автор', book.author],
    ['ISBN', book.isbn],
    ['Год издания', book.publishedYear],
    ['Страниц', book.pages],
    ['Язык', book.language],
    ['Наличие', `${book.inStock} шт.`],
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link to="/catalog" className="inline-flex items-center gap-2 font-bold text-coffee hover:text-ink">
        <ArrowLeft size={18} /> Вернуться в каталог
      </Link>

      <div className="mt-8 grid gap-10 rounded-[2rem] bg-white p-5 shadow-soft md:grid-cols-[0.9fr_1.1fr] md:p-8">
        <div className="overflow-hidden rounded-[2rem] bg-stone-100">
          <img src={book.coverUrl} alt={book.title} className="h-full min-h-[520px] w-full object-cover" />
        </div>
        <div className="flex flex-col justify-center">
          <span className="mb-4 w-fit rounded-full bg-amber-100 px-4 py-2 text-sm font-bold text-amber-800">
            {book.category}
          </span>
          <h1 className="text-4xl font-black tracking-tight text-ink md:text-5xl">{book.title}</h1>
          <p className="mt-3 text-xl text-stone-600">{book.author}</p>
          <div className="mt-5 flex items-center gap-4 text-sm font-bold text-stone-600">
            <span className="flex items-center gap-1">
              <Star className="fill-orange-400 text-orange-400" size={18} /> {book.rating}
            </span>
            <span>{book.reviewsCount} отзывов</span>
            <span className="flex items-center gap-1 text-emerald-700">
              <CheckCircle2 size={18} /> В наличии
            </span>
          </div>
          <p className="mt-6 text-lg leading-8 text-stone-700">{book.description}</p>
          <div className="mt-8 flex items-end gap-4">
            <p className="text-4xl font-black">{formatPrice(book.price)}</p>
            {book.oldPrice && <p className="pb-1 text-xl text-stone-400 line-through">{formatPrice(book.oldPrice)}</p>}
          </div>
          <button
            type="button"
            onClick={() => addToCart(book)}
            className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-8 py-4 font-bold text-white hover:bg-coffee"
          >
            <ShoppingCart size={20} /> Добавить в корзину
          </button>

          <dl className="mt-10 grid gap-3 sm:grid-cols-2">
            {details.map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-stone-50 p-4">
                <dt className="text-xs font-black uppercase tracking-widest text-stone-400">{label}</dt>
                <dd className="mt-1 font-bold text-ink">{value ?? 'Не указано'}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="mb-6 text-3xl font-black">Похожие рекомендации</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {recommended
            .filter((item) => item.id !== book.id)
            .slice(0, 4)
            .map((item) => (
              <BookCard key={item.id} book={item} />
            ))}
        </div>
      </div>
    </section>
  );
}
