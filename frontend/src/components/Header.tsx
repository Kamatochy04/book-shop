import { Link, NavLink } from 'react-router-dom';
import { BookOpen, ShoppingBag, UserRound } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/', label: 'Главная' },
  { to: '/catalog', label: 'Каталог' },
  { to: '/account', label: 'Кабинет' },
];

export function Header() {
  const { totalItems } = useCart();
  const { isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-xl font-black tracking-tight text-ink">
          <span className="rounded-2xl bg-ink p-2 text-white">
            <BookOpen size={22} />
          </span>
          Bookly
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-semibold ${isActive ? 'text-coffee' : 'text-stone-600 hover:text-ink'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to={isAuthenticated ? '/account' : '/login'}
            className="hidden items-center gap-2 rounded-full border border-stone-200 px-4 py-2 text-sm font-semibold text-stone-700 hover:border-coffee hover:text-coffee sm:flex"
          >
            <UserRound size={18} />
            {isAuthenticated ? 'Профиль' : 'Войти'}
          </Link>
          <Link
            to="/cart"
            className="relative rounded-full bg-ink p-3 text-white shadow-soft hover:bg-coffee"
            aria-label="Корзина"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-orange-500 px-1 text-xs font-bold">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
