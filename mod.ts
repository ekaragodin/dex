import { path, process } from "./deps.ts";

export async function run(): Promise<void> {
  const [command = "default", ...commandArgs] = Deno.args;
  const dexfile = path.join(Deno.cwd(), "dexfile.ts");

  const commands = await import(dexfile);

  const p = process.exec(`${commands[command]} ${commandArgs.join(" ")}`);
  await p.status();
}
