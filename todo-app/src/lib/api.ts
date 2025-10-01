import { Task } from "@/types/task";

const API_BASE = "/api";

async function api<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, init);
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`${init?.method ?? 'GET'} ${path} failed: ${res.status} ${text}`);
    }
    return res.json();
}

export async function createTask(task: Task): Promise<Task> {
    return api<Task>(`/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
    });
}

export async function getTasks(): Promise<Task[]> {
    return api<Task[]>(`/tasks`, { method: "GET" });
}

export async function editTask(task: Task): Promise<Task> {
    return api<Task>(`/edit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
    });
}

export async function deleteTask(id: string): Promise<{ success: boolean } | Task> {
    return api<{ success: boolean } | Task>(`/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(id),
    });
}

export async function searchTasks(query: string): Promise<Task[]> {
    return api<Task[]>(`/search?q=${encodeURIComponent(query)}`, { method: "GET" });
}