import Link from 'next/link';
import { CategoryCard } from '@ik/ui';
import { getCategories } from '@ik/services';
import { ROUTES } from '@ik/config';

export const metadata = { title: 'Categories · By Craft' };

export default async function CategoriesPage() {
  const cats = await getCategories();
  return (
    <div className="bg-mono-surface text-mono-ink">
      <section className="border-b border-mono-line">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px] py-12 md:py-16">
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 uppercase tracking-[0.14em] text-[0.68rem] font-medium text-mono-muted">
              <li>
                <Link href={ROUTES.HOME} className="hover:text-mono-ink">Home</Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-mono-ink">Categories</li>
            </ol>
          </nav>
          <p className="uppercase tracking-[0.24em] text-[0.7rem] font-semibold text-brand-red mb-3">
            By Craft
          </p>
          <h1 className="font-sans font-semibold uppercase leading-[1.02] tracking-[-0.005em] text-mono-ink text-[clamp(2rem,4.5vw,3.5rem)]">
            Categories
          </h1>
          <p className="mt-6 text-[1.0625rem] text-mono-muted max-w-2xl leading-[1.55]">
            Six living traditions of Manipur, each with its own villages, its own fibres, and its own weavers.
            Choose a craft to see the pieces.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-12 lg:px-16 xl:px-[88px]">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {cats.map((c) => (
              <CategoryCard key={c.id} category={c} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
