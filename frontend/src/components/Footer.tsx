export function Footer() {
  return (
    <footer className="mt-20 border-t border-stone-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 text-sm text-stone-600 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <p className="text-lg font-black text-ink">Bookly</p>
          <p className="mt-3 max-w-sm">Книжный интернет-магазин с подборками, быстрым заказом и личным кабинетом.</p>
        </div>
        <div>
          <p className="font-bold text-ink">Покупателям</p>
          <p className="mt-3">Доставка по России, оплата онлайн или при получении, возврат в течение 14 дней.</p>
        </div>
        <div>
          <p className="font-bold text-ink">Администрирование</p>
          <p className="mt-3">Каталог книг управляется через Strapi Admin по адресу backend `/admin`.</p>
        </div>
      </div>
    </footer>
  );
}
