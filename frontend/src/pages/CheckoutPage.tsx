import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { createOrder } from '../lib/api';
import { formatPrice } from '../lib/format';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { token, user } = useAuth();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setStatus('loading');

    try {
      await createOrder(
        {
          customerName: String(form.get('customerName')),
          email: String(form.get('email')),
          phone: String(form.get('phone')),
          address: String(form.get('address')),
          total: totalPrice,
          items: items.map((item) => ({
            id: item.book.id,
            title: item.book.title,
            price: item.book.price,
            quantity: item.quantity,
          })),
        },
        token ?? undefined,
      );
      clearCart();
      setStatus('success');
      setTimeout(() => navigate('/account'), 900);
    } catch {
      setStatus('error');
    }
  };

  if (items.length === 0 && status !== 'success') {
    return (
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white p-10 text-center shadow-soft">
          <p className="text-lg text-stone-600">Корзина пуста, заказ оформить нельзя.</p>
          <Link to="/catalog" className="mt-6 inline-flex rounded-full bg-ink px-7 py-3 font-bold text-white">
            Выбрать книги
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-black tracking-tight">Оформление заказа</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 shadow-soft">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="font-bold">Имя</span>
              <input name="customerName" defaultValue={user?.username} required className="w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-coffee" />
            </label>
            <label className="space-y-2">
              <span className="font-bold">Email</span>
              <input name="email" type="email" defaultValue={user?.email} required className="w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-coffee" />
            </label>
            <label className="space-y-2">
              <span className="font-bold">Телефон</span>
              <input name="phone" required className="w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-coffee" />
            </label>
            <label className="space-y-2 md:col-span-2">
              <span className="font-bold">Адрес доставки</span>
              <textarea name="address" required rows={4} className="w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-coffee" />
            </label>
          </div>
          {status === 'error' && <p className="mt-4 rounded-2xl bg-red-50 p-4 font-semibold text-red-700">Не удалось отправить заказ. Проверьте, запущен ли Strapi.</p>}
          {status === 'success' && <p className="mt-4 rounded-2xl bg-emerald-50 p-4 font-semibold text-emerald-700">Заказ создан, корзина очищена.</p>}
          <button disabled={status === 'loading'} className="mt-6 rounded-full bg-ink px-8 py-4 font-bold text-white hover:bg-coffee disabled:opacity-60">
            {status === 'loading' ? 'Создаем заказ...' : 'Подтвердить заказ'}
          </button>
        </form>

        <aside className="h-fit rounded-3xl bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-black">Ваш заказ</h2>
          <div className="mt-5 space-y-3">
            {items.map((item) => (
              <div key={item.book.id} className="flex justify-between gap-3 text-sm">
                <span>{item.book.title} x {item.quantity}</span>
                <span className="font-bold">{formatPrice(item.book.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-between border-t border-stone-200 pt-6 text-xl font-black">
            <span>Итого</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
