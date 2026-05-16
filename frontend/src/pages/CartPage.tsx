import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/format';

export function CartPage() {
  const { items, totalPrice, updateQuantity, removeFromCart } = useCart();

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-black tracking-tight">Корзина</h1>

      {items.length === 0 ? (
        <div className="mt-8 rounded-3xl bg-white p-10 text-center shadow-soft">
          <p className="text-lg text-stone-600">В корзине пока нет книг.</p>
          <Link to="/catalog" className="mt-6 inline-flex rounded-full bg-ink px-7 py-3 font-bold text-white hover:bg-coffee">
            Перейти в каталог
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.book.id} className="grid gap-4 rounded-3xl bg-white p-4 shadow-soft sm:grid-cols-[120px_1fr_auto]">
                <img src={item.book.coverUrl} alt={item.book.title} className="h-40 w-full rounded-2xl object-cover sm:w-28" />
                <div>
                  <Link to={`/books/${item.book.slug}`} className="text-xl font-black hover:text-coffee">
                    {item.book.title}
                  </Link>
                  <p className="mt-1 text-stone-500">{item.book.author}</p>
                  <p className="mt-4 font-black">{formatPrice(item.book.price)}</p>
                </div>
                <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:justify-between">
                  <button type="button" onClick={() => removeFromCart(item.book.id)} className="text-stone-400 hover:text-red-600">
                    <Trash2 size={20} />
                  </button>
                  <div className="flex items-center rounded-full border border-stone-200">
                    <button type="button" onClick={() => updateQuantity(item.book.id, item.quantity - 1)} className="p-3">
                      <Minus size={16} />
                    </button>
                    <span className="min-w-8 text-center font-bold">{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.book.id, item.quantity + 1)} className="p-3">
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="h-fit rounded-3xl bg-white p-6 shadow-soft">
            <h2 className="text-2xl font-black">Итого</h2>
            <div className="mt-6 space-y-3 text-stone-600">
              <div className="flex justify-between">
                <span>Товары</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Доставка</span>
                <span>Бесплатно</span>
              </div>
            </div>
            <div className="mt-6 flex justify-between border-t border-stone-200 pt-6 text-xl font-black">
              <span>К оплате</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <Link to="/checkout" className="mt-6 block rounded-full bg-ink px-6 py-4 text-center font-bold text-white hover:bg-coffee">
              Оформить заказ
            </Link>
          </aside>
        </div>
      )}
    </section>
  );
}
