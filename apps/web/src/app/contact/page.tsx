import { Container } from '@ik/ui';
import { Section } from '@ik/ui';
import { Stack } from '@ik/ui';
import { Grid } from '@ik/ui';
import { Input } from '@ik/ui';
import { Textarea } from '@ik/ui';
import { Button } from '@ik/ui';
import { Eyebrow } from '@ik/ui';
import { Hairline } from '@ik/ui';
import { Breadcrumb } from '@ik/ui';
import { ROUTES } from '@ik/config';
import { SITE } from '@ik/config';

export const metadata = { title: 'Contact' };

export default function ContactPage() {
  return (
    <Section space="xl">
      <Container size="wide">
        <Breadcrumb items={[{ label: 'Home', href: ROUTES.HOME }, { label: 'Contact' }]} className="mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-16">
          <Stack gap={6}>
            <Eyebrow tone="vermilion">Write to us</Eyebrow>
            <h1 className="font-display font-normal text-ink text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.08]">
              We reply within a working day.
            </h1>
            <p className="text-[1rem] text-ink-700 leading-[1.6]">
              For orders and shipping, please quote your order code. For guild introductions
              and wholesale, please tell us the piece and the quantity.
            </p>
            <Hairline vermilion className="w-16" />
            <Stack gap={3}>
              <div>
                <p className="small-caps text-[0.72rem] text-muted">Email</p>
                <a href={'mailto:' + SITE.email} className="text-[1rem] text-ink hover:text-vermilion">
                  {SITE.email}
                </a>
              </div>
              <div>
                <p className="small-caps text-[0.72rem] text-muted">Studio</p>
                <p className="text-[0.9375rem] text-ink-700 leading-[1.6]">
                  Wangkhei Bazaar, Imphal East<br />
                  Manipur 795005, India
                </p>
              </div>
              <div>
                <p className="small-caps text-[0.72rem] text-muted">Hours</p>
                <p className="text-[0.9375rem] text-ink-700">Mon — Sat · 10:00 to 18:00 IST</p>
              </div>
            </Stack>
          </Stack>

          <form className="flex flex-col gap-6">
            <Grid cols={2} gap={4}>
              <Input label="Full name" name="fullName" required />
              <Input label="Email" name="email" type="email" required />
            </Grid>
            <Input label="Subject" name="subject" />
            <Textarea label="Message" name="message" rows={6} required />
            <div className="flex justify-end">
              <Button type="submit">Send message</Button>
            </div>
          </form>
        </div>
      </Container>
    </Section>
  );
}
