import { defineConfig, globalIgnores } from "eslint/config";

/**
 * Shared base ESLint config for @ik packages (non-Next).
 * Extend `./next.mjs` for Next.js apps.
 */
export const baseConfig = defineConfig([
  globalIgnores([
    "dist/**",
    "build/**",
    "node_modules/**",
  ]),
]);

export default baseConfig;
