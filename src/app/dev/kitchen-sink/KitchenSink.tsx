'use client';

import { useState } from 'react';
import { Heart, Search, Star } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Stack } from '@/components/layout/Stack';
import { Cluster } from '@/components/layout/Cluster';
import { Grid } from '@/components/layout/Grid';
import { Frame } from '@/components/layout/Frame';
import {
  Accordion,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Checkbox,
  Divider,
  Drawer,
  Eyebrow,
  Hairline,
  Icon,
  Input,
  Marker,
  MetaTable,
  Modal,
  Radio,
  Select,
  Skeleton,
  Switch,
  Tabs,
  Textarea,
  Tooltip,
  useToast,
} from '@/components/primitives';
import { FadeIn, Reveal, StaggerItem, StaggerList } from '@/components/motion';

interface Swatch {
  name: string;
  cls: string;
  ink?: 'light' | 'dark';
}

const CANVAS_SWATCHES: Swatch[] = [
  { name: 'Canvas', cls: 'bg-canvas', ink: 'dark' },
  { name: 'Frame', cls: 'bg-frame', ink: 'dark' },
  { name: 'Ink', cls: 'bg-ink', ink: 'light' },
  { name: 'Ink 700', cls: 'bg-ink-700', ink: 'light' },
  { name: 'Ink 500', cls: 'bg-ink-500', ink: 'light' },
  { name: 'Ink 300', cls: 'bg-ink-300', ink: 'dark' },
  { name: 'Muted', cls: 'bg-muted', ink: 'light' },
];

const VOICE_SWATCHES: Swatch[] = [
  { name: 'Vermilion', cls: 'bg-vermilion', ink: 'light' },
  { name: 'Vermilion hover', cls: 'bg-vermilion-hover', ink: 'light' },
  { name: 'Action', cls: 'bg-action', ink: 'light' },
  { name: 'Action hover', cls: 'bg-action-hover', ink: 'light' },
  { name: 'Indigo', cls: 'bg-indigo', ink: 'light' },
  { name: 'Success', cls: 'bg-success', ink: 'light' },
  { name: 'Warn', cls: 'bg-warn', ink: 'light' },
  { name: 'Danger', cls: 'bg-danger', ink: 'light' },
];

export function KitchenSink() {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [radioValue, setRadioValue] = useState('standard');
  const { push } = useToast();

  return (
    <>
      <Section space="lg">
        <Container size="wide">
          <Breadcrumb items={[{ label: 'Dev', href: '/dev' }, { label: 'Kitchen Sink' }]} />
          <div className="mt-8">
            <Marker eyebrow="Phase 1 · Foundation">Kitchen Sink</Marker>
            <p className="mt-8 max-w-prose text-ink-700 text-[1.0625rem] leading-[1.6]">
              Every primitive, every variant, side by side. Use this route to smoke-test tokens,
              keyboard focus, and motion. Not indexed. Not linked from the customer app.
            </p>
          </div>
        </Container>
      </Section>

      {/* COLORS */}
      <Section space="md">
        <Container size="wide">
          <SectionHead eyebrow="Tokens" title="Color" />
          <Grid cols={4} gap={4} className="mt-10">
            {[...CANVAS_SWATCHES, ...VOICE_SWATCHES].map((s) => (
              <div key={s.name} className="flex flex-col gap-2">
                <div
                  className={
                    'aspect-[4/3] rounded-md border border-ink-100 ' + s.cls
                  }
                >
                  <div className="p-3 h-full flex items-end">
                    <span
                      className={
                        'small-caps text-[0.7rem] ' +
                        (s.ink === 'light' ? 'text-canvas' : 'text-ink')
                      }
                    >
                      {s.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* TYPOGRAPHY */}
      <Section space="md">
        <Container size="wide">
          <SectionHead eyebrow="Tokens" title="Typography" />
          <Stack gap={8} className="mt-10">
            <div>
              <span className="small-caps text-[0.7rem] text-muted">Marker · display · fluid</span>
              <p className="mt-3 font-display font-light text-ink text-[clamp(4rem,12vw,9rem)] leading-[0.95] tracking-[-0.02em]">
                Muga
              </p>
            </div>
            <div>
              <span className="small-caps text-[0.7rem] text-muted">Display XL</span>
              <h1 className="mt-3 font-display text-[clamp(3rem,7vw,6rem)] leading-[1.02] text-ink">
                Named by maker.
              </h1>
            </div>
            <div>
              <span className="small-caps text-[0.7rem] text-muted">Display LG</span>
              <h2 className="mt-3 font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.08] text-ink">
                Framed by place.
              </h2>
            </div>
            <div>
              <span className="small-caps text-[0.7rem] text-muted">Display MD</span>
              <h3 className="mt-3 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.15] text-ink">
                Shipped from Imphal, folded with tissue.
              </h3>
            </div>
            <div>
              <span className="small-caps text-[0.7rem] text-muted">Body LG</span>
              <p className="mt-3 text-[1.125rem] text-ink-700 leading-[1.6] max-w-prose">
                A phanek is not a size — it is a piece with a village, a weaver, a dye, and a season.
                We publish the artisan, the fibre, and the days on the loom.
              </p>
            </div>
            <div>
              <span className="small-caps text-[0.7rem] text-muted">Body / Caption / Small caps</span>
              <div className="mt-3 flex flex-col gap-2">
                <p className="text-[1rem] text-ink leading-[1.6]">Body — 1rem, 1.6 line height.</p>
                <p className="text-[0.875rem] text-ink-700">Body small — 0.875rem.</p>
                <p className="text-[0.75rem] text-muted">Caption — 0.75rem, muted.</p>
                <p className="small-caps text-[0.72rem] text-muted">Small caps · guild · muga silk</p>
              </div>
            </div>
          </Stack>
        </Container>
      </Section>

      {/* BUTTONS */}
      <Section space="md">
        <Container size="wide">
          <SectionHead eyebrow="Primitives" title="Button" />
          <Stack gap={6} className="mt-10">
            <Cluster gap={4}>
              <Button size="sm">Primary sm</Button>
              <Button size="md">Primary md</Button>
              <Button size="lg">Primary lg</Button>
              <Button disabled>Disabled</Button>
            </Cluster>
            <Cluster gap={4}>
              <Button variant="ghost" size="sm">Ghost sm</Button>
              <Button variant="ghost" size="md">Ghost md</Button>
              <Button variant="ghost" size="lg">Ghost lg</Button>
              <Button variant="ghost" disabled>Disabled ghost</Button>
            </Cluster>
            <Cluster gap={4}>
              <Button variant="text" size="sm">Text sm</Button>
              <Button variant="text" size="md">Text md</Button>
              <Button variant="text" size="lg">Text lg</Button>
            </Cluster>
            <Cluster gap={4}>
              <Button as="link" href="/">As link</Button>
              <Button fullWidth className="max-w-sm">Full width</Button>
            </Cluster>
          </Stack>
        </Container>
      </Section>

      {/* BADGES / EYEBROW / DIVIDER / HAIRLINE / ICON / AVATAR */}
      <Section space="md">
        <Container size="wide">
          <SectionHead eyebrow="Primitives" title="Badge · Eyebrow · Divider · Icon · Avatar" />
          <Stack gap={8} className="mt-10">
            <Cluster gap={3}>
              <Badge>Default</Badge>
              <Badge tone="vermilion">Vermilion</Badge>
              <Badge tone="green">Green</Badge>
              <Badge tone="warn">Warn</Badge>
              <Badge tone="danger">Danger</Badge>
              <Badge tone="indigo">Indigo</Badge>
            </Cluster>
            <Cluster gap={6}>
              <Eyebrow tone="muted">Muted eyebrow</Eyebrow>
              <Eyebrow tone="vermilion">Vermilion eyebrow</Eyebrow>
              <Eyebrow tone="ink">Ink eyebrow</Eyebrow>
            </Cluster>
            <div className="max-w-md flex flex-col gap-4">
              <Divider />
              <Divider tone="vermilion" />
              <Divider tone="muted" />
              <Hairline />
              <Hairline vermilion />
              <Cluster gap={4} align="center">
                <span className="text-[0.9375rem] text-ink">Left</span>
                <Divider orientation="vertical" />
                <span className="text-[0.9375rem] text-ink">Right</span>
              </Cluster>
            </div>
            <Cluster gap={4} align="center">
              <Icon icon={Heart} size={14} />
              <Icon icon={Heart} size={16} />
              <Icon icon={Heart} size={20} />
              <Icon icon={Heart} size={24} />
              <Icon icon={Heart} size={28} />
              <Icon icon={Star} size={24} label="Star" />
              <Icon icon={Search} size={24} />
            </Cluster>
            <Cluster gap={4} align="center">
              <Avatar name="Rimjhim Konjengbam" size={24} />
              <Avatar name="Rimjhim Konjengbam" size={32} />
              <Avatar name="Rimjhim Konjengbam" size={40} shape="circle" />
              <Avatar name="Longpi Guild" size={48} shape="circle" />
              <Avatar name="Muga Guild" size={64} />
              <Avatar name="Kauna Guild" size={80} />
            </Cluster>
          </Stack>
        </Container>
      </Section>

      {/* MARKER + META TABLE */}
      <Section space="md">
        <Container size="wide">
          <SectionHead eyebrow="Signature Move" title="Oversized Marker · Provenance Card" />
          <Grid cols={2} gap={12} className="mt-10">
            <Marker eyebrow="The Edit · Winter">Warp &amp; Weft</Marker>
            <Frame tone="frame" padding="md" radius="lg">
              <Eyebrow tone="vermilion">Provenance</Eyebrow>
              <p className="mt-3 font-display text-[1.75rem] text-ink leading-tight">
                Muga stole by Rimjhim Konjengbam
              </p>
              <div className="mt-6">
                <MetaTable
                  rows={[
                    { label: 'Artisan', value: 'Rimjhim Konjengbam' },
                    { label: 'Village', value: 'Wangkhei, Imphal' },
                    { label: 'Fibre', value: 'Muga silk · 100%' },
                    { label: 'Days', value: '18 days on the loom' },
                    { label: 'GI code', value: 'GI-2010-MG-114' },
                  ]}
                />
              </div>
            </Frame>
          </Grid>
        </Container>
      </Section>

      {/* FORMS */}
      <Section space="md">
        <Container size="wide">
          <SectionHead eyebrow="Primitives" title="Forms" />
          <Grid cols={2} gap={12} className="mt-10">
            <Stack gap={6}>
              <Input label="Full name" placeholder="Rimjhim Konjengbam" />
              <Input label="Email" type="email" placeholder="you@example.com" hint="We only email when your piece ships." />
              <Input label="Phone" placeholder="+91 98000 00000" error="Enter a valid Indian phone number." />
              <Input label="Search" placeholder="Search…" leading={<Icon icon={Search} size={16} />} />
              <Textarea label="Gift note" placeholder="Add a short handwritten note" />
            </Stack>
            <Stack gap={6}>
              <Select
                label="Delivery speed"
                options={[
                  { label: 'Standard · 5–7 days', value: 'standard' },
                  { label: 'Express · 2–3 days', value: 'express' },
                  { label: 'Same-day (Imphal only)', value: 'same' },
                ]}
              />
              <Stack gap={3}>
                <Checkbox label="Subscribe to Craft Journal" hint="One essay a month. Never a discount code." />
                <Checkbox label="Save this address" defaultChecked />
                <Checkbox label="Disabled" disabled />
              </Stack>
              <Stack gap={3}>
                {(['standard', 'express', 'same'] as const).map((v) => (
                  <Radio
                    key={v}
                    name="delivery"
                    label={v === 'standard' ? 'Standard' : v === 'express' ? 'Express' : 'Same-day'}
                    value={v}
                    checked={radioValue === v}
                    onChange={() => setRadioValue(v)}
                  />
                ))}
              </Stack>
              <Cluster gap={6}>
                <Switch label="Newsletter" defaultChecked />
                <Switch label="Stylist updates" />
              </Cluster>
            </Stack>
          </Grid>
        </Container>
      </Section>

      {/* ACCORDION + TABS + TOOLTIP */}
      <Section space="md">
        <Container size="wide">
          <SectionHead eyebrow="Primitives" title="Accordion · Tabs · Tooltip" />
          <Grid cols={2} gap={12} className="mt-10">
            <Accordion
              items={[
                { id: 'care', title: 'Care', content: 'Dry-clean only. Store folded in tissue.' },
                { id: 'ship', title: 'Shipping', content: 'Ships from Imphal within 3 working days.' },
                { id: 'returns', title: 'Returns', content: 'Return within 14 days, in original condition.' },
              ]}
              defaultOpen="care"
            />
            <div>
              <Tabs
                tabs={[
                  { id: 'story', label: 'Story', content: <p className="text-ink-700">A quiet piece from Wangkhei.</p> },
                  { id: 'makers', label: 'Makers', content: <p className="text-ink-700">Rimjhim + two apprentices.</p> },
                  { id: 'gi', label: 'GI', content: <p className="text-ink-700">Registered code GI-2010-MG-114.</p> },
                ]}
              />
              <div className="mt-8">
                <Tooltip content="Registered in the GI office">
                  <span className="text-[0.9375rem] text-ink underline decoration-muted underline-offset-4">
                    Hover for provenance
                  </span>
                </Tooltip>
              </div>
            </div>
          </Grid>
        </Container>
      </Section>

      {/* OVERLAYS + TOAST */}
      <Section space="md">
        <Container size="wide">
          <SectionHead eyebrow="Primitives" title="Overlays" />
          <Cluster gap={4} className="mt-10">
            <Button onClick={() => setModalOpen(true)}>Open modal</Button>
            <Button variant="ghost" onClick={() => setDrawerOpen(true)}>
              Open drawer
            </Button>
            <Button variant="text" onClick={() => push('Added to cart.', 'success')}>
              Push success toast
            </Button>
            <Button variant="text" onClick={() => push('Out of stock.', 'danger')}>
              Push danger toast
            </Button>
          </Cluster>
        </Container>
      </Section>

      {/* SKELETON */}
      <Section space="md">
        <Container size="wide">
          <SectionHead eyebrow="Primitives" title="Skeleton" />
          <Grid cols={3} gap={6} className="mt-10">
            {[0, 1, 2].map((i) => (
              <Stack key={i} gap={3}>
                <Skeleton className="aspect-[4/5] w-full" radius="md" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </Stack>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* MOTION */}
      <Section space="md">
        <Container size="wide">
          <SectionHead eyebrow="Motion" title="FadeIn · Reveal · StaggerList" />
          <Grid cols={3} gap={8} className="mt-10">
            <FadeIn>
              <Frame tone="frame" padding="sm">
                <span className="small-caps text-[0.7rem] text-muted">FadeIn</span>
                <p className="mt-3 text-ink">Fades on mount.</p>
              </Frame>
            </FadeIn>
            <Reveal>
              <Frame tone="frame" padding="sm">
                <span className="small-caps text-[0.7rem] text-muted">Reveal</span>
                <p className="mt-3 text-ink">Fades in when in view.</p>
              </Frame>
            </Reveal>
            <StaggerList className="flex flex-col gap-3">
              {['Phanek', 'Longpi', 'Kauna', 'Muga'].map((n) => (
                <StaggerItem key={n}>
                  <Frame tone="frame" padding="sm">
                    <span className="text-ink">{n}</span>
                  </Frame>
                </StaggerItem>
              ))}
            </StaggerList>
          </Grid>
        </Container>
      </Section>

      {/* LAYOUT PRIMITIVES */}
      <Section space="md">
        <Container size="wide">
          <SectionHead eyebrow="Layout" title="Container · Section · Stack · Cluster · Grid · Frame" />
          <Stack gap={8} className="mt-10">
            <Frame tone="frame" padding="sm">
              <span className="small-caps text-[0.7rem] text-muted">Cluster (wraps, gap 4)</span>
              <Cluster gap={4} className="mt-3">
                <Badge>Muga</Badge>
                <Badge>Kauna</Badge>
                <Badge>Longpi</Badge>
                <Badge>Cane</Badge>
                <Badge>Wood</Badge>
              </Cluster>
            </Frame>
            <Frame tone="frame" padding="sm">
              <span className="small-caps text-[0.7rem] text-muted">Grid (3-up, gap 6)</span>
              <Grid cols={3} gap={6} className="mt-3">
                <div className="aspect-[4/5] bg-canvas rounded-md" />
                <div className="aspect-[4/5] bg-canvas rounded-md" />
                <div className="aspect-[4/5] bg-canvas rounded-md" />
              </Grid>
            </Frame>
            <Frame tone="indigo" padding="md">
              <Eyebrow tone="ink" className="text-canvas/80">Editorial Frame · indigo tone</Eyebrow>
              <p className="mt-3 font-display text-[1.75rem] leading-tight">
                For editorial callouts — long-form asides.
              </p>
            </Frame>
          </Stack>
        </Container>
      </Section>

      <Section space="lg">
        <Container size="wide">
          <Hairline />
          <p className="mt-6 text-muted text-[0.8125rem]">
            End of Kitchen Sink · Phase 1 · not indexed.
          </p>
        </Container>
      </Section>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="GI Registry Verification"
      >
        <Stack gap={4}>
          <p className="text-ink-700 text-[0.9375rem]">
            This piece is registered with the Geographical Indications Registry, India.
          </p>
          <MetaTable
            rows={[
              { label: 'GI Code', value: 'GI-2010-MG-114' },
              { label: 'Issued', value: '14 Mar 2010' },
              { label: 'Status', value: 'Active' },
            ]}
          />
          <div className="pt-2">
            <Button onClick={() => setModalOpen(false)}>Close</Button>
          </div>
        </Stack>
      </Modal>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Your Basket"
      >
        <div className="p-6">
          <Stack gap={4}>
            <p className="text-ink-700 text-[0.9375rem]">
              Empty — this is a demo drawer. Escape closes.
            </p>
            <Button variant="ghost" onClick={() => setDrawerOpen(false)}>
              Close drawer
            </Button>
          </Stack>
        </div>
      </Drawer>
    </>
  );
}

function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="flex items-end justify-between gap-6 flex-wrap">
      <div>
        <Eyebrow tone="vermilion">{eyebrow}</Eyebrow>
        <h2 className="mt-2 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-tight text-ink">
          {title}
        </h2>
      </div>
      <Hairline className="flex-1 min-w-[80px]" />
    </div>
  );
}
