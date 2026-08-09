import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

/**
 * Shared ESLint config for Next.js apps in the @ik monorepo.
 * Wraps eslint-config-next with our project-wide ignores.
 */
export const nextConfig = defineConfig([
  ...nextVitals,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default nextConfig;
