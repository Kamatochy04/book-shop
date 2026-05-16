import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    try {
      await register(String(form.get('username')), String(form.get('email')), String(form.get('password')));
      navigate('/account');
    } catch {
      setError('Не удалось зарегистрироваться. Возможно, пользователь уже существует.');
    }
  };

  return (
    <section className="mx-auto max-w-md px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-white p-8 shadow-soft">
        <h1 className="text-3xl font-black">Регистрация</h1>
        <p className="mt-2 text-stone-600">Создайте аккаунт покупателя для заказов и личного кабинета.</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block space-y-2">
            <span className="font-bold">Имя пользователя</span>
            <input name="username" required className="w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-coffee" />
          </label>
          <label className="block space-y-2">
            <span className="font-bold">Email</span>
            <input name="email" type="email" required className="w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-coffee" />
          </label>
          <label className="block space-y-2">
            <span className="font-bold">Пароль</span>
            <input name="password" type="password" minLength={6} required className="w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-coffee" />
          </label>
          {error && <p className="rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</p>}
          <button className="w-full rounded-full bg-ink px-6 py-4 font-bold text-white hover:bg-coffee">Создать аккаунт</button>
        </form>
        <p className="mt-6 text-center text-sm text-stone-600">
          Уже есть аккаунт? <Link to="/login" className="font-bold text-coffee">Войти</Link>
        </p>
      </div>
    </section>
  );
}
