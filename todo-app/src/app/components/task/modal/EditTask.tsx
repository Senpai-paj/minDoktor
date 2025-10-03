/**
 * EditTask component for editing an existing todo task.
 * Manages the task editing dialog UI, form state, and submission logic.
 *
 * @module EditTask
 */

'use client'

import { useEffect, useRef, useState } from 'react'
import { edit } from '@/lib/serivces/task.Service'
import { X } from 'lucide-react'
import type { Task } from '@/types/task'

/**
 * Props for EditTask component.
 * @typedef {Object} EditTaskProps
 * @property {boolean} isOpen - Whether the dialog is open.
 * @property {Task | null} task - The task to edit.
 * @property {() => void} onClose - Callback to close the dialog.
 * @property {(task: Task) => void} [onEdited] - Optional callback run after task edit.
 */
type EditTaskProps = {
  isOpen: boolean
  task: Task | null
  onClose: () => void
  onEdited?: (task: Task) => void
}

/**
 * EditTask dialog component.
 *
 * @param {EditTaskProps} props - Props for the component.
 * @returns {JSX.Element|null} The rendered task editing dialog, or null if not shown.
 */
export default function EditTask({ isOpen, task, onClose, onEdited }: EditTaskProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  /**
   * Formats the date for use in the input[type="date"].
   * @param {Date} date
   * @returns {string} ISO date string (YYYY-MM-DD)
   */
  const formatDateInput = (date: Date) => date.toISOString().split("T")[0];

  /**
   * Effect to handle Escape key closing the dialog.
   */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  /**
   * Effect to populate form fields when opening dialog with a task.
   */
  useEffect(() => {
    if (isOpen && task) {
      setShow(true); 
      setTitle(task.title ?? "");
      setDescription(task.description ?? "");
      setPriority(task.priority ?? 0);
      const asDate = new Date(task.dueDate);
      setDueDate(!isNaN(asDate.getTime()) ? formatDateInput(asDate) : "");

      const timer = setTimeout(() => setMounted(true), 10);
      return () => clearTimeout(timer);
    } else {
      setMounted(false);
      const timer = setTimeout(() => setShow(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, task]);

  /**
   * Handles the form submission to edit an existing task.
   * @param {React.FormEvent} e - Form submission event.
   */
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!task) return;
    if (!title.trim() || !dueDate) return;

    setSubmitting(true);

    const updated: Task = {
      ...task,
      title: title.trim(),
      description: description.trim(),
      dueDate: new Date(dueDate),
      editDate: new Date(),
      priority,
    };

    edit(updated)
      .then((saved) => {
        onEdited?.(saved);
        onClose();
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          if (err.name !== "AbortError") {
            console.error("Edit failed", err);
          }
        } else {
          console.error("Edit failed (non-Error)", err);
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-start transition-colors duration-300 ${
        isOpen ? "bg-black/40" : "bg-transparent pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        className={`h-full w-full max-w-md transform transition-transform duration-500 ease-in-out
          ${mounted ? "translate-x-0" : "-translate-x-full"}
          backdrop-blur-xl bg-gray-900/10 border-r border-sky-300/20 shadow-2xl`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl cursor-default font-semibold">Edit Task</h2>
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
              {submitting ? "Editing..." : "Edit Task"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
