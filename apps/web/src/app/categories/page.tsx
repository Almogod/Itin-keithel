import { Container } from '@ik/ui';
import { Section } from '@ik/ui';
import { Grid } from '@ik/ui';
import { ChapterMarker } from '@ik/ui';
import { CategoryCard } from '@ik/ui';
import { Breadcrumb } from '@ik/ui';
import { getCategories } from '@ik/services';
import { ROUTES } from '@ik/config';

export const metadata = { title: 'Categories · By Craft' };

export default async function CategoriesPage() {
  const cats = await getCategories();
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
