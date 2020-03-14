import { path, process } from "./deps.ts";
import { ExecError } from './ExecError.ts';

export async function run(): Promise<void> {
  const [command = "default", ...commandArgs] = Deno.args;
  const dexfile = path.join(Deno.cwd(), "dexfile.ts");

  const commands = await import(dexfile);

  const p = process.exec(`${commands[command]} ${commandArgs.join(" ")}`);
  const { code } = await p.status();

  if (code !== undefined && code !== 0) {
    throw new ExecError(code, `Command failed with exit code ${code}`);
  }
}
