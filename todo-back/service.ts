/**
 * Service layer for business logic related to tasks.
 * Handles operations such as retrieving, creating, editing, deleting, searching, populating, and checking tasks.
 *
 * @module service
 */

import { Task } from "./types.ts";
import { readAllTasks, writeAllTasks } from "./repository.ts";

/**
 * Retrieves all tasks from storage.
 * @returns {Promise<Task[]>} Array of all tasks.
 */
export async function getAllTasks(): Promise<Task[]> {
  return await readAllTasks();
}

/**
 * Creates a new task and saves it to storage.
 * @param {Task} newTask - The task object to create.
 * @returns {Promise<Task>} The created task.
 */
export async function createTask(newTask: Task): Promise<Task> {
  const tasks = await readAllTasks();
  tasks.push(newTask);
  await writeAllTasks(tasks);
  return newTask;
}

/**
 * Edits an existing task or adds it if not found.
 * Updates the editDate property before saving.
 * @param {Task} editTask - The edited task object.
 * @returns {Promise<Task>} The edited task.
 */
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

/**
 * Finds tasks by matching title with the given query (case-insensitive).
 * @param {string} query - Search query for task title.
 * @returns {Promise<Task[]>} Array of matching tasks.
 */
export async function findTasksByName(query: string): Promise<Task[]> {
  const tasks = await readAllTasks();
  const normalized = query.trim().toLowerCase();
  return tasks.filter(t => t.title.toLowerCase().includes(normalized));
}

/**
 * Deletes a task by its ID.
 * @param {string} id - ID of the task to delete.
 * @returns {Promise<string>} Status message.
 */
export async function deleteTask(id: string): Promise<string> {
  const tasks = await readAllTasks();
  const newTasks = tasks.filter(task => task.id !== id);
  await writeAllTasks(newTasks);
  return 'task deleted';
}

/**
 * Populates storage with sample data (seed tasks).
 * @returns {Promise<void>} Resolves when data is populated.
 */
export async function populate() {
  const rawData = [
      {
        "id": "0b8c0a4d-9f2b-4d55-8f4e-1a0c2b6d0001",
        "title": "Plan quarterly roadma",
        "description": "Draft the Q4 roadmap including milestones and dependencies.",
        "dueDate": "2025-10-03T00:00:00.000Z",
        "createDate": "2025-09-28T10:10:00.000Z",
        "status": false,
        
      },
      {
        "id": "1d9e1f63-33c0-4a0d-9a3a-2c3b5f6e0002",
        "title": "Write unit tests for service layer",
        "description": "Add coverage for createTask and findTasksByName functions.",
        "dueDate": "2025-10-04T09:00:00.000Z",
        "createDate": "2025-09-28T11:20:00.000Z",
        "status": false,
        
      },
      {
        "id": "2a7b3d42-1e0a-4b7a-9a0b-7c6d8e9f0003",
        "title": "Refactor repository file IO",
        "description": "Optimize JSON read/write with atomic temp file strategy.",
        "dueDate": "2025-10-05T09:00:00.000Z",
        "createDate": "2025-09-28T12:30:00.000Z",
        "status": true,
        
      },
      {
        "id": "3c5d6e71-2b9a-4f7e-8d0c-8e7f6a5b0004",
        "title": "Design API error schema",
        "description": "Propose consistent error response format with codes and messages.",
        "dueDate": "2025-10-06T09:00:00.000Z",
        "createDate": "2025-09-28T13:40:00.000Z",
        "status": false,
        
      },
      {
        "id": "4e6f7a82-3c1b-4e8f-9a1d-9f8e7d6c0005",
        "title": "Add request validation",
        "description": "Validate incoming JSON bodies for required fields and types.",
        "dueDate": "2025-10-07T09:00:00.000Z",
        "createDate": "2025-09-28T14:50:00.000Z",
        "status": false,
        
      },
      {
        "id": "5f708b93-4d2c-4f90-a12e-af9f0e1d0006",
        "title": "Write README setup instructions",
        "description": "Document how to run server and configure API_URL for frontend.",
        "dueDate": "2025-10-08T09:00:00.000Z",
        "createDate": "2025-09-28T15:10:00.000Z",
        "status": true,
        
      },
      {
        "id": "6a819ca4-5e3d-4a01-b23f-b0a1f12e0007",
        "title": "Implement search by title UI",
        "description": "Add search box to filter tasks by name on the frontend.",
        "dueDate": "2025-10-09T09:00:00.000Z",
        "createDate": "2025-09-28T16:20:00.000Z",
        "status": false,
        
      },
      {
        "id": "7b92adB5-6f4e-4b12-c34f-c1b2f23f0008",
        "title": "Add logging middleware",
        "description": "Log method, path, and response status for each request.",
        "dueDate": "2025-10-10T09:00:00.000Z",
        "createDate": "2025-09-28T17:30:00.000Z",
        "status": false,
        
      },
      {
        "id": "8c03beC6-704f-4c23-d45a-d2c3f34f0009",
        "title": "Configure CI checks",
        "description": "Add formatting and lint checks to CI workflow.",
        "dueDate": "2025-10-11T09:00:00.000Z",
        "createDate": "2025-09-28T18:40:00.000Z",
        "status": false,
        
      },
      {
        "id": "9d14cfD7-8150-4d34-e56b-e3d4055f0010",
        "title": "Harden CORS settings",
        "description": "Restrict origins and methods for production environment.",
        "dueDate": "2025-10-12T09:00:00.000Z",
        "createDate": "2025-09-28T19:50:00.000Z",
        "status": false,
        
      },
      {
        "id": "10e25e18-9261-4e45-f67c-f4e5166f0011",
        "title": "Add pagination to tasks list",
        "description": "Support limit and offset query params on GET /tasks.",
        "dueDate": "2025-10-13T09:00:00.000Z",
        "createDate": "2025-09-29T08:00:00.000Z",
        "status": false,
       
      },
      {
        "id": "11f36f29-a372-4f56-078d-05f6277f0012",
        "title": "Implement delete endpoint",
        "description": "Expose DELETE /tasks/:id to remove a task.",
        "dueDate": "2025-10-14T09:00:00.000Z",
        "createDate": "2025-09-29T08:20:00.000Z",
        "status": true,
        
      },
      {
        "id": "12a47a3a-b483-4057-189e-16f7388f0013",
        "title": "Build edit task form",
        "description": "Create UI to update title and description of a task.",
        "dueDate": "2025-10-15T09:00:00.000Z",
        "createDate": "2025-09-29T09:15:00.000Z",
        "status": false,
        
      }
  ];

  const oldTasks = await readAllTasks();

  const tasks: Task[] = rawData.map(t => ({
      ...t,
      id: crypto.randomUUID(),
      dueDate: new Date(t.dueDate),
      createDate: new Date(t.createDate),
      priority: Math.floor(Math.random() * 3),
  }));

  if (oldTasks !== undefined) {
    const combinedTasks: Task[] = [...oldTasks, ...tasks];
    await writeAllTasks(combinedTasks);
    return combinedTasks;
  }
  
  await writeAllTasks(tasks);
  return tasks;
}

/**
 * Checks or unchecks a task's completion status by ID.
 * Marks the task as complete/incomplete and updates storage.
 * @param {string} id - ID of the task to check/uncheck.
 * @returns {Promise<string>} Status message.
 */
export async function checkTask(id: string): Promise<Task> {
  const tasks = await readAllTasks();
  const updatedTasks = tasks.map(t => t.id === id ? { ...t, status: true } : t);

  await writeAllTasks(updatedTasks);

  const task = updatedTasks.find(t => t.id === id);
  if (!task) throw new Error("Task not found");

  return task;
}
