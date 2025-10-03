/**
 * Repository layer for persistent storage of tasks.
 * Handles reading and writing tasks to a JSON file on disk.
 *
 * @module repository
 */

import { Task } from "./types.ts";

const DB_PATH = "./tasks.db.json";

/**
 * Ensures that the database file exists.
 * If not, creates an empty JSON array file.
 * @returns {Promise<void>}
 */
async function ensureFile(): Promise<void> {
  try {
    await Deno.stat(DB_PATH);
  } catch (_err) {
    await Deno.writeTextFile(DB_PATH, JSON.stringify([]));
  }
}

/**
 * Reads all tasks from the database file.
 * @returns {Promise<Task[]>} Array of tasks from storage.
 */
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

/**
 * Writes the provided array of tasks to the database file.
 * @param {Task[]} tasks - Array of tasks to write.
 * @returns {Promise<void>}
 */
export async function writeAllTasks(tasks: Task[]): Promise<void> {
  await ensureFile();
  await Deno.writeTextFile(DB_PATH, JSON.stringify(tasks, null, 2));
}
