import { Link } from 'react-router-dom';

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
};

export function SectionHeader({ eyebrow, title, description, actionHref, actionLabel }: SectionHeaderProps) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>
        {eyebrow && <p className="mb-2 text-sm font-black uppercase tracking-[0.25em] text-coffee">{eyebrow}</p>}
        <h2 className="text-3xl font-black tracking-tight text-ink md:text-4xl">{title}</h2>
        {description && <p className="mt-3 max-w-2xl text-stone-600">{description}</p>}
      </div>
      {actionHref && actionLabel && (
        <Link to={actionHref} className="font-bold text-coffee hover:text-ink">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
