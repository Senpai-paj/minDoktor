'use client'

import { useEffect, useRef, useState } from 'react'
import { create } from '@/lib/serivces/task.Service'
import { X } from 'lucide-react';
import type { Task } from '@/types/task'

type CreateTaskProps = {
  isOpen: boolean
  onClose: () => void
  onCreated?: (task: Task) => void
}

export default function CreateTask({ isOpen, onClose, onCreated }: CreateTaskProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

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
    .catch((err: any) => {
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
                className="w-full rounded border border-dashed px-3 py-2 outline-none bg-sky-950/40 border-slate-500"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Details..."
              />
            </div>

            <div>
              <label className="mb-1 block text-sm">Due date</label>
              <input
                type="date"
                className="w-full rounded border px-3 py-2 outline-none bg-sky-950/40"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold">Priority</label>
              <select
                className="w-full rounded border px-3 py-2 outline-none bg-sky-950/40"
                value={priority}
                onChange={(e) => setPriority(Number(e.target.value))}
                required
              >
                <option value={0}>Low</option>
                <option value={1}>Medium</option>
                <option value={2}>High</option>
              </select>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-3xl cursor-pointer border px-4 py-2 duration-200 hover:bg-sky-900/60 "
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="rounded-3xl bg-green-700 cursor-pointer px-4 durtation-300 py-2 text-white hover:bg-green-500 disabled:opacity-60"
              >
                {submitting ? 'Creating...' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
