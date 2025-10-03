/**
 * Service functions for handling task operations in the UI.
 * Wraps API calls and adds error handling for all task-related actions.
 *
 * @module task.Service
 */

import { Task } from "@/types/task";
import { getTasks, searchTasks, editTask, createTask, deleteTask, checkTask } from "../api";

/**
 * Fetches all tasks from the backend.
 * @param {AbortSignal} [signal] - Optional abort signal.
 * @returns {Promise<Task[]>} Array of tasks.
 * @throws Will throw an error if the fetch fails.
 */
export async function fetchTasks(signal?: AbortSignal): Promise<Task[]> {
    const res = await getTasks(signal);
    if (!res) throw new Error("Failed to fetch");
    return res;
}

/**
 * Searches for tasks by query string.
 * @param {string} q - The search query.
 * @param {AbortSignal} [signal] - Optional abort signal.
 * @returns {Promise<Task[]>} Array of matching tasks.
 * @throws Will throw an error if the search fails.
 */
export async function search(q: string, signal?: AbortSignal): Promise<Task[]> {
    const findedTasks = await searchTasks(q, signal)
    if (!findedTasks) throw new Error("Failed to search");
    return findedTasks;
}

/**
 * Edits an existing task.
 * @param {Task} updated - The updated task object.
 * @returns {Promise<Task>} The edited task.
 * @throws Will throw an error if the edit fails.
 */
export async function edit(updated: Task): Promise<Task> {
    const edited = await editTask(updated)
    if (!edited) throw new Error("Failed to edit");
    return edited;
}

/**
 * Creates a new task.
 * @param {Task} newTask - The task to create.
 * @returns {Promise<Task>} The created task.
 * @throws Will throw an error if the creation fails.
 */
export async function create(newTask: Task): Promise<Task> {
    const created = await createTask(newTask)
    if (!created) throw new Error("Failed to create");
    return created;
}

/**
 * Deletes a task by ID.
 * @param {string} id - The ID of the task to delete.
 * @param {AbortSignal} [signal] - Optional abort signal.
 * @returns {Promise<{ success: boolean } | Task>} Deletion result or deleted task.
 * @throws Will throw an error if the deletion fails.
 */
export async function deleteT(id: string, signal?: AbortSignal): Promise<{ success: boolean } | Task> {
    const deleted = await deleteTask(id, signal)
    if (!deleted) throw new Error("Failed to delete");
    return deleted;
}

/**
 * Checks or unchecks a task by ID (toggle completion status).
 * @param {string} id - The ID of the task to check/uncheck.
 * @param {AbortSignal} [signal] - Optional abort signal.
 * @returns {Promise<Task>} The updated task.
 * @throws Will throw an error if the operation fails.
 */
export async function check(id: string, signal?: AbortSignal): Promise<Task> {
    const deleted = await checkTask(id, signal)
    if (!deleted) throw new Error("Failed to check");
    return deleted;
}