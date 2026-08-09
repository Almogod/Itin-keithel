type ClassInput = string | number | null | undefined | false | Record<string, unknown> | ClassInput[];

export function cn(...inputs: ClassInput[]): string {
  const out: string[] = [];
  const walk = (v: ClassInput): void => {
    if (!v) return;
    if (typeof v === 'string' || typeof v === 'number') {
      out.push(String(v));
      return;
    }
    if (Array.isArray(v)) {
      for (const x of v) walk(x);
      return;
    }
    if (typeof v === 'object') {
      for (const key in v) {
        if (v[key]) out.push(key);
      }
    }
  };
  for (const i of inputs) walk(i);
  return out.join(' ');
}
