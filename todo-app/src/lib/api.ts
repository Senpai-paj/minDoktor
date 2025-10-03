/**
 * API utility functions for interacting with the backend todo service.
 * Provides functions for CRUD operations and other task actions via HTTP.
 *
 * @module api
 */

import { Task } from "@/types/task";

const API_BASE = "/api";

/**
 * Generic API request wrapper.
 * Sends a fetch request to the backend and parses the JSON response.
 * Throws an error if the response is not OK.
 *
 * @template T - Response type.
 * @param {string} path - API endpoint path (relative to API_BASE).
 * @param {RequestInit} [init] - Optional fetch initialization options.
 * @returns {Promise<T>} Parsed JSON response.
 */
async function api<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, init);
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`${init?.method ?? 'GET'} ${path} failed: ${res.status} ${text}`);
    }
    return res.json();
}

/**
 * Creates a new task.
 * @param {Task} task - The task to create.
 * @returns {Promise<Task>} The created task.
 */
export async function createTask(task: Task): Promise<Task> {
    return api<Task>(`/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
    });
}

/**
 * Fetches all tasks.
 * @param {AbortSignal} [signal] - Optional abort signal.
 * @returns {Promise<Task[]>} Array of tasks.
 */
export async function getTasks(signal?: AbortSignal): Promise<Task[]> {
    return api<Task[]>(`/tasks`, { method: "GET", signal });
}

/**
 * Edits an existing task.
 * @param {Task} task - The updated task object.
 * @returns {Promise<Task>} The edited task.
 */
export async function editTask(task: Task): Promise<Task> {
    return api<Task>(`/edit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
    });
}

/**
 * Deletes a task by ID.
 * @param {string} id - The ID of the task to delete.
 * @param {AbortSignal} [signal] - Optional abort signal.
 * @returns {Promise<{ success: boolean } | Task>} Deletion result or deleted task.
 */
export async function deleteTask(id: string, signal?: AbortSignal): Promise<{ success: boolean } | Task> {
    return api<{ success: boolean } | Task>(`/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(id),
        signal
    });
}

/**
 * Searches tasks by query string.
 * @param {string} query - Search query for task titles.
 * @param {AbortSignal} [signal] - Optional abort signal.
 * @returns {Promise<Task[]>} Array of matching tasks.
 */
export async function searchTasks(query: string, signal?: AbortSignal): Promise<Task[]> {
    return api<Task[]>(`/search?q=${encodeURIComponent(query)}`, { method: "GET", signal });
}

/**
 * Populates the backend with sample tasks.
 * @param {AbortSignal} [signal] - Optional abort signal.
 * @returns {Promise<Task[]>} Array of created sample tasks.
 */
export async function populate(signal?: AbortSignal): Promise<Task[]> {
    return api<Task[]>(`/populate`, { method: "POST", signal });
}

/**
 * Checks or unchecks a task by ID (toggle completion status).
 * @param {string} id - The ID of the task to check/uncheck.
 * @param {AbortSignal} [signal] - Optional abort signal.
 * @returns {Promise<Task>} The updated task.
 */
export async function checkTask(id: string, signal?: AbortSignal): Promise<Task> {
    return api<Task>(`/check`, { 
        method: "PUT", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(id), 
        signal
    });
}