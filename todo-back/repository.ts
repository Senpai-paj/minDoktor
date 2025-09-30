import { Task } from "./types.ts";

const DB_PATH = "./tasks.db.json";

async function ensureFile(): Promise<void> {
  try {
    await Deno.stat(DB_PATH);
  } catch (_err) {
    await Deno.writeTextFile(DB_PATH, JSON.stringify([]));
  }
}

export async function readAllTasks(): Promise<Task[]> {
  await ensureFile();
  const text = await Deno.readTextFile(DB_PATH);
  try {
    const data = JSON.parse(text) as Task[];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function writeAllTasks(tasks: Task[]): Promise<void> {
  await ensureFile();
  await Deno.writeTextFile(DB_PATH, JSON.stringify(tasks, null, 2));
}


