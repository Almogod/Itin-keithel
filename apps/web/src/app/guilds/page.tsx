import { Container } from '@ik/ui';
import { Section } from '@ik/ui';
import { Grid } from '@ik/ui';
import { ChapterMarker } from '@ik/ui';
import { GuildCard } from '@ik/ui';
import { getGuilds } from '@ik/services';

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
