#!/usr/bin/env -S deno --allow-all
import { testing, asserts } from "./deps.ts";
import { path } from "./deps.ts";

const { test } = testing;
const { assertEquals } = asserts;
const cwd = path.join(Deno.cwd(), "test");

async function runCommand(args: string[]) {
  const process = Deno.run({
    args: ["../dex.ts", ...args],
    stdout: "piped",
    stderr: "piped",
    cwd
  });
  const { code } = await process.status();
  const output = await process.output();
  const decoder = new TextDecoder();

  return {
    code,
    output: decoder.decode(output).trim()
  };
}

test(async function runNamedCommand() {
  const { output } = await runCommand(["script1"]);
  assertEquals(output, "script1");
});

test(async function appendArgs() {
  const { output } = await runCommand(["script1", "my", "args"]);
  assertEquals(output, "script1 my args");
});

test(async function runDefaultCommand() {
  const { output } = await runCommand([]);
  assertEquals(output, "default");
});

test(async function passReturnCodeFromProcess() {
  const { code } = await runCommand(["qwe"]);
  assertEquals(code, 127);
});
