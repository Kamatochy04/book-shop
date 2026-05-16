import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, WalletCards } from 'lucide-react';
import { BookCard } from '../components/BookCard';
import { SectionHeader } from '../components/SectionHeader';
import { getRecommendedBooks } from '../lib/api';
import type { Book } from '../types/book';

const benefits = [
  { icon: Truck, title: 'Быстрая доставка', text: 'Курьером или в пункт выдачи от 1 дня.' },
  { icon: ShieldCheck, title: 'Гарантия качества', text: 'Проверяем издания и бережно упаковываем.' },
  { icon: WalletCards, title: 'Удобная оплата', text: 'Онлайн, картой или при получении заказа.' },
];

export function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    getRecommendedBooks().then(setBooks);
  }, []);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-stone-100 via-paper to-amber-100">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <p className="mb-4 text-sm font-black uppercase tracking-[0.3em] text-coffee">Книжный магазин</p>
            <h1 className="max-w-3xl text-5xl font-black tracking-tight text-ink md:text-7xl">
              Найдите книгу, которая останется с вами
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-700">
              Рекомендации, классика, нон-фикшн и книги для разработчиков в одном каталоге. Добавляйте в корзину,
              оформляйте заказ и управляйте покупками в личном кабинете.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/catalog" className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 font-bold text-white hover:bg-coffee">
                Перейти в каталог <ArrowRight size={18} />
              </Link>
              <Link to="/register" className="inline-flex items-center justify-center rounded-full border border-stone-300 px-7 py-4 font-bold text-ink hover:border-coffee hover:text-coffee">
                Создать аккаунт
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-8 rounded-[3rem] bg-coffee/20 blur-3xl" />
            <div className="relative grid grid-cols-2 gap-4">
              {books.slice(0, 4).map((book, index) => (
                <img
                  key={book.id}
                  src={book.coverUrl}
                  alt={book.title}
                  className={`h-64 rounded-3xl object-cover shadow-soft ${index % 2 ? 'mt-10' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {benefits.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-3xl bg-white p-6 shadow-soft">
              <Icon className="text-coffee" size={28} />
              <h3 className="mt-4 text-xl font-black">{title}</h3>
              <p className="mt-2 text-stone-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Рекомендации"
          title="Популярные книги недели"
          description="Подборка товаров с флагом recommended из Strapi. Если API недоступен, фронтенд показывает локальные моковые данные."
          actionHref="/catalog"
          actionLabel="Весь каталог"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
    </>
  );
}
