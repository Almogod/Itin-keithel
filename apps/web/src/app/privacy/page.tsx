import { Container } from '@ik/ui';
import { Section } from '@ik/ui';
import { Stack } from '@ik/ui';
import { Eyebrow } from '@ik/ui';
import { Hairline } from '@ik/ui';
import { Breadcrumb } from '@ik/ui';
import { ROUTES } from '@ik/config';

export const metadata = { title: 'Privacy Policy' };

export default function PrivacyPage() {
  return (
    <Section space="xl">
      <Container size="editorial">
        <Breadcrumb items={[{ label: 'Home', href: ROUTES.HOME }, { label: 'Privacy' }]} className="mb-8" />
        <Eyebrow tone="vermilion">Last updated · August 2026</Eyebrow>
        <h1 className="mt-4 font-display font-normal text-ink text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.08]">
          Privacy Policy
        </h1>
        <Hairline vermilion className="w-16 my-8" />

        <Stack gap={8} className="text-[1rem] text-ink-700 leading-[1.7]">
          <section>
            <h2 className="font-display text-[1.375rem] text-ink mb-2">What we collect</h2>
            <p>
              To place and ship your order, we collect your name, email, phone, shipping address,
              and payment reference. To improve the site, we also collect anonymised page views via a
              self-hosted analytics tool. We do not use Facebook Pixel, Google Ads, or any third-party
              advertising tracker.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[1.375rem] text-ink mb-2">What we do not collect</h2>
            <ul className="flex flex-col gap-1 mt-2">
              <li>· We do not store card numbers. Payments are processed by Razorpay.</li>
              <li>· We do not sell or share your data with third parties.</li>
              <li>· We do not send unsolicited marketing.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-[1.375rem] text-ink mb-2">Cookies</h2>
            <p>
              We use a single first-party cookie to keep you signed in and one to remember your cart.
              We do not use tracking cookies.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[1.375rem] text-ink mb-2">Your rights</h2>
            <p>
              You may request a copy of your personal data or ask us to delete it at any time. Write
              to hello@itin-keithel.com and we will action within seven working days.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[1.375rem] text-ink mb-2">Contact</h2>
            <p>
              Questions about this policy may be sent to hello@itin-keithel.com. If you are in the EU
              or UK, you have the right to lodge a complaint with your local data protection authority.
            </p>
          </section>
        </Stack>
      </Container>
    </Section>
  );
}
