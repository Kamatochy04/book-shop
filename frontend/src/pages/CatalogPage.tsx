import { useEffect, useMemo, useState } from 'react';
import { BookCard } from '../components/BookCard';
import { SectionHeader } from '../components/SectionHeader';
import { getBooks } from '../lib/api';
import type { Book } from '../types/book';

export function CatalogPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    getBooks().then(setBooks);
  }, []);

  const categories = useMemo(() => ['all', ...Array.from(new Set(books.map((book) => book.category)))], [books]);

  const filteredBooks = books.filter((book) => {
    const matchesQuery = `${book.title} ${book.author}`.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === 'all' || book.category === category;
    return matchesQuery && matchesCategory;
  });

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Каталог"
        title="Все книги"
        description="Ищите по названию или автору, фильтруйте по жанрам и добавляйте товары в корзину."
      />

      <div className="mb-8 grid gap-4 rounded-3xl bg-white p-4 shadow-soft md:grid-cols-[1fr_260px]">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Поиск книги или автора"
          className="rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-coffee"
        />
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-coffee"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item === 'all' ? 'Все жанры' : item}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="rounded-3xl bg-white p-10 text-center text-stone-600 shadow-soft">Книги не найдены.</div>
      )}
    </section>
  );
}
