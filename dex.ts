#!/usr/bin/env -S deno --allow-all
import { run } from "./mod.ts";

try {
  await run();
} catch (e) {
  console.log(`Error: ${e.message}`);
  Deno.exit(1);
}
