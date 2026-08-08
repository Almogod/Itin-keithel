import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Grid } from '@/components/layout/Grid';
import { ChapterMarker } from '@/components/patterns/ChapterMarker';
import { GuildCard } from '@/components/patterns/GuildCard';
import { getGuilds } from '@/services';

export const metadata = { title: 'Guilds' };

export default async function GuildsPage() {
  const guilds = await getGuilds();
  return (
    <Section space="xl">
      <Container size="wide">
        <ChapterMarker chapter="Named" title="The Guilds" />
        <p className="mt-6 text-[1.0625rem] text-ink-700 max-w-prose">
          Every piece we sell belongs to a guild — a group of makers with a village, a technique,
          and a share of what you pay.
        </p>
        <Grid cols={3} gap={12} className="mt-16">
          {guilds.map((g) => (
            <GuildCard key={g.id} guild={g} />
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
