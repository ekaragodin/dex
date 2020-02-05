#!/usr/bin/env -S deno --allow-all
import { run } from "./mod.ts";
import { ExecError } from './ExecError.ts';

try {
  await run();
} catch (e) {
  console.log(`Error: ${e.message}`);
  const code = e instanceof ExecError ? e.code : 1;
  Deno.exit(code || 1);
}
