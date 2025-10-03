/**
 * Type definitions for todo tasks (frontend).
 * Declares the Task type used in the UI and API layer.
 *
 * @module types/task
 */

/**
 * Represents a single todo task.
 * @typedef {Object} Task
 * @property {string} id - Unique identifier for the task.
 * @property {string} title - Title of the task.
 * @property {string} description - Detailed description of the task.
 * @property {Date} dueDate - The date by which the task should be completed.
 * @property {Date} createDate - The date the task was created.
 * @property {Date} [editDate] - The date the task was last edited (optional).
 * @property {boolean} status - Completion status of the task.
 * @property {number} priority - Numeric priority of the task.
 */
export type Task = {
  id: string; 
  title: string;
  description: string;
  dueDate: Date;
  createDate: Date;
  editDate?: Date;
  status: boolean;
  priority: number;
}