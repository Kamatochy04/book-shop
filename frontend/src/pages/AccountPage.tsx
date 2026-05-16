import { Link } from 'react-router-dom';
import { PackageCheck, Settings, UserRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const demoOrders = [
  { id: 'BK-1042', date: '16.05.2026', status: 'В обработке', total: '2 140 ₽' },
  { id: 'BK-0981', date: '08.05.2026', status: 'Доставлен', total: '1 650 ₽' },
];

export function AccountPage() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white p-10 shadow-soft">
          <UserRound className="mx-auto text-coffee" size={42} />
          <h1 className="mt-4 text-3xl font-black">Личный кабинет</h1>
          <p className="mt-3 text-stone-600">Войдите или зарегистрируйтесь, чтобы видеть профиль и заказы.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Link to="/login" className="rounded-full bg-ink px-6 py-3 font-bold text-white hover:bg-coffee">Войти</Link>
            <Link to="/register" className="rounded-full border border-stone-300 px-6 py-3 font-bold hover:border-coffee hover:text-coffee">Регистрация</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.25em] text-coffee">Профиль</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight">Здравствуйте, {user?.username}</h1>
          <p className="mt-2 text-stone-600">{user?.email}</p>
        </div>
        <button onClick={logout} className="w-fit rounded-full border border-stone-300 px-6 py-3 font-bold hover:border-red-300 hover:text-red-600">
          Выйти
        </button>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-3xl bg-white p-6 shadow-soft">
          <Settings className="text-coffee" size={28} />
          <h2 className="mt-4 text-2xl font-black">Данные аккаунта</h2>
          <dl className="mt-5 space-y-4">
            <div>
              <dt className="text-sm font-bold text-stone-400">Имя</dt>
              <dd className="font-black">{user?.username}</dd>
            </div>
            <div>
              <dt className="text-sm font-bold text-stone-400">Email</dt>
              <dd className="font-black">{user?.email}</dd>
            </div>
            <div>
              <dt className="text-sm font-bold text-stone-400">Роль</dt>
              <dd className="font-black">Покупатель</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-soft">
          <div className="flex items-center gap-3">
            <PackageCheck className="text-coffee" size={28} />
            <h2 className="text-2xl font-black">Мои заказы</h2>
          </div>
          <div className="mt-5 overflow-hidden rounded-2xl border border-stone-200">
            {demoOrders.map((order) => (
              <div key={order.id} className="grid gap-2 border-b border-stone-200 p-4 last:border-b-0 md:grid-cols-4">
                <span className="font-black">{order.id}</span>
                <span className="text-stone-600">{order.date}</span>
                <span className="font-bold text-coffee">{order.status}</span>
                <span className="font-black md:text-right">{order.total}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-stone-500">
            В демо показаны моковые заказы. Новые заказы отправляются в Strapi collection type `Order`.
          </p>
        </div>
      </div>
    </section>
  );
}
