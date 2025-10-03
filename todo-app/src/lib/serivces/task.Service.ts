import { Task } from "@/types/task";
import { getTasks, searchTasks, editTask, createTask, deleteTask, checkTask } from "../api";

export async function fetchTasks(signal?: AbortSignal): Promise<Task[]> {
    const res = await getTasks(signal);
    if (!res) throw new Error("Failed to fetch");
    return res;
}

export async function search(q: string, signal?: AbortSignal): Promise<Task[]> {
    const findedTasks = await searchTasks(q, signal)
    if (!findedTasks) throw new Error("Failed to search");
    return findedTasks;
}

export async function edit(updated: Task): Promise<Task> {
    const edited = await editTask(updated)
    if (!edited) throw new Error("Failed to edit");
    return edited;
}

export async function create(newTask: Task): Promise<Task> {
    const created = await createTask(newTask)
    if (!created) throw new Error("Failed to create");
    return created;
}

export async function deleteT(id: string, signal?: AbortSignal): Promise<{ success: boolean } | Task> {
    const deleted = await deleteTask(id, signal)
    if (!deleted) throw new Error("Failed to delete");
    return deleted;
}

export async function check(id: string, signal?: AbortSignal): Promise<Task> {
    const deleted = await checkTask(id, signal)
    if (!deleted) throw new Error("Failed to check");
    return deleted;
}