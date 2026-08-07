import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Grid } from '@/components/layout/Grid';
import { ChapterMarker } from '@/components/patterns/ChapterMarker';
import { CategoryCard } from '@/components/patterns/CategoryCard';
import { Breadcrumb } from '@/components/primitives/Breadcrumb';
import { categoriesApi } from '@/services';
import { ROUTES } from '@/config/routes';

export const metadata = { title: 'Categories · By Craft' };

export default function CategoriesPage() {
  const cats = categoriesApi.all();
  return (
    <Section space="xl">
      <Container size="wide">
        <Breadcrumb items={[{ label: 'Home', href: ROUTES.HOME }, { label: 'Categories' }]} className="mb-8" />
        <ChapterMarker chapter="By Craft" title="Categories" />
        <p className="text-[1.0625rem] text-ink-700 max-w-prose mt-6">
          Six living traditions of Manipur, each with its own villages, its own fibres, and its own weavers.
          Choose a craft to see the pieces.
        </p>
        <Grid cols={3} gap={8} className="mt-16">
          {cats.map((c) => (
            <CategoryCard key={c.id} category={c} />
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
