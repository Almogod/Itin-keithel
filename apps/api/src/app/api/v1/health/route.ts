import { NextResponse } from 'next/server';
import type { ApiEnvelope } from '@ik/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface HealthPayload {
  status: 'ok';
  service: 'itin-keithel-api';
  version: string;
  uptimeSeconds: number;
}

const startedAt = Date.now();

export async function GET() {
  const body: ApiEnvelope<HealthPayload> = {
    ok: true,
    data: {
      status: 'ok',
      service: 'itin-keithel-api',
      version: process.env.npm_package_version ?? '0.0.1',
      uptimeSeconds: Math.round((Date.now() - startedAt) / 1000),
    },
    meta: {
      requestId: crypto.randomUUID(),
      serverTime: new Date().toISOString(),
    },
  };
  return NextResponse.json(body, { status: 200 });
}
