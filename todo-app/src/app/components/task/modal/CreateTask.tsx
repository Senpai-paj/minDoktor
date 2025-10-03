/**
 * CreateTask component for creating a new todo task.
 * Manages the task creation dialog UI, form state, and submission logic.
 *
 * @module CreateTask
 */

'use client'

import { useEffect, useRef, useState } from 'react'
import { create } from '@/lib/serivces/task.Service'
import { X } from 'lucide-react';
import type { Task } from '@/types/task'

/**
 * Props for CreateTask component.
 * @typedef {Object} CreateTaskProps
 * @property {boolean} isOpen - Whether the dialog is open.
 * @property {() => void} onClose - Callback to close the dialog.
 * @property {(task: Task) => void} [onCreated] - Optional callback run after task creation.
 */
type CreateTaskProps = {
  isOpen: boolean
  onClose: () => void
  onCreated?: (task: Task) => void
}

/**
 * CreateTask dialog component.
 *
 * @param {CreateTaskProps} props - Props for the component.
 * @returns {JSX.Element} The rendered task creation dialog.
 */
export default function CreateTask({ isOpen, onClose, onCreated }: CreateTaskProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  /**
   * Effect to handle Escape key closing the dialog.
   */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  /**
   * Handles the form submission to create a new task.
   * @param {React.FormEvent} e - Form submission event.
   */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !dueDate) return;

    setSubmitting(true);

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      dueDate: new Date(dueDate),
      createDate: new Date(),
      status: false,
      priority,
    };

    create(newTask)
      .then((saved) => {
        onCreated?.(saved);
        onClose();

        setTitle('');
        setDescription('');
        setDueDate('');
      })
      .catch((err: unknown) => {
        console.error("Failed to create task", err);
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end transition-colors duration-300
      ${isOpen ? 'bg-black/40' : 'bg-transparent pointer-events-none'}`}
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        className={`h-full w-full max-w-md transform transition-transform duration-500 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        backdrop-blur-xl bg-gray-900/10 border-l border-sky-300/20 shadow-2xl`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl cursor-default font-semibold">Create Task</h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded cursor-pointer p-1 duration-300 hover:text-red-400"
              aria-label="Close"
            >
              <X />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 flex-1 overflow-y-auto">
            <div>
              <label className="mb-1 block font-semibold text-sm">Title</label>
              <input
                className="w-full rounded border px-3 py-2 outline-none bg-sky-950/40"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm">Description</label>
              <textarea
                className="w-full rounded border px-3 py-2 outline-none bg-sky-950/40"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task description"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm">Due Date</label>
              <input
                type="date"
                className="w-full rounded border px-3 py-2 outline-none bg-sky-950/40"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm">Priority</label>
              <input
                type="number"
                min={0}
                max={10}
                className="w-full rounded border px-3 py-2 outline-none bg-sky-950/40"
                value={priority}
                onChange={(e) => setPriority(Number(e.target.value))}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {submitting ? "Creating..." : "Create Task"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
