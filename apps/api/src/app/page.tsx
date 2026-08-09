export const metadata = { title: 'Itin Keithel · API' };

export default function ApiIndexPage() {
  return (
    <main style={{ fontFamily: 'monospace', padding: 40, color: '#141312', background: '#F7F4EE', minHeight: '100vh' }}>
      <h1 style={{ fontSize: 24, marginBottom: 8 }}>Itin Keithel API</h1>
      <p style={{ opacity: 0.7 }}>
        Route Handlers live under <code>/api/v1/*</code>. This surface is not intended for browsers.
      </p>
      <ul style={{ marginTop: 24, lineHeight: 2 }}>
        <li>
          <a href="/api/v1/health">GET /api/v1/health</a>
        </li>
      </ul>
    </main>
  );
}
