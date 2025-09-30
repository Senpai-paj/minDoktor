import { Task } from "./types.ts";
import { readAllTasks, writeAllTasks } from "./repository.ts";

export async function getAllTasks(): Promise<Task[]> {
  return await readAllTasks();
}

export async function createTask(newTask: Task): Promise<Task> {
  const tasks = await readAllTasks();
  newTask.id = crypto.randomUUID();
  tasks.push(newTask);
  await writeAllTasks(tasks);
  return newTask;
}

export async function editTask(editTask: Task): Promise<Task> {
  const tasks = await readAllTasks();
  const index = tasks.findIndex(task => task.id === editTask.id);

  editTask.editDate = new Date();
 
  if (index !== -1) {
    tasks[index] = editTask;
  } else {
    tasks.push(editTask);
  }

  await writeAllTasks(tasks);

  return editTask;
}

export async function findTasksByName(query: string): Promise<Task[]> {
  const tasks = await readAllTasks();
  const normalized = query.trim().toLowerCase();
  return tasks.filter(t => t.title.toLowerCase().includes(normalized));
}

export async function deleteTask(id: string) {

  const tasks = await readAllTasks();
  const newTasks = tasks.filter(task => task.id !== id);
  await writeAllTasks(newTasks);
  return 'task deleted';
}
