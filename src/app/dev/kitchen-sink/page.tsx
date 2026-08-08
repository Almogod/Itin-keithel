import type { Metadata } from 'next';
import { KitchenSink } from './KitchenSink';

export const metadata: Metadata = {
  title: 'Kitchen Sink',
  robots: { index: false, follow: false },
};

export default function KitchenSinkPage() {
  return <KitchenSink />;
}
