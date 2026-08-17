/**
 * Production build for the client bundle.
 *
 * This exists instead of a plain `bun build` command because the CLI has no way
 * to load bundler plugins, and Tailwind is compiled by one. `bunfig.toml` only
 * wires the plugin into the dev server.
 */

import { rm } from "node:fs/promises";
import tailwind from "bun-plugin-tailwind";

const outdir = "./dist";

await rm(outdir, { recursive: true, force: true });

const result = await Bun.build({
  entrypoints: ["./src/index.html"],
  outdir,
  target: "browser",
  sourcemap: "linked",
  minify: true,
  define: { "process.env.NODE_ENV": '"production"' },
  env: "BUN_PUBLIC_*",
  plugins: [tailwind],
});

if (!result.success) {
  for (const log of result.logs) console.error(log);
  process.exit(1);
}

for (const output of result.outputs) {
  const size = (output.size / 1024).toFixed(2);
  console.log(`${output.path.replace(/.*[\\/]/, "")}  ${size} KB`);
}
