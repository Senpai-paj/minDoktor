'use client'

import { useEffect, useRef, useState } from 'react'
import { createTask } from '@/lib/api'
import { X } from 'lucide-react';
import type { Task } from '@/types/task'

type CreateTaskProps = {
  isOpen: boolean
  onClose: () => void
  onCreated?: (task: Task) => void
}

export default function CreateTask({ isOpen, onClose, onCreated }: CreateTaskProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('') // yyyy-mm-dd
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !dueDate) return
    setSubmitting(true)
    try {
      const newTask: Task = {
        id: crypto.randomUUID(),
        title: title.trim(),
        description: description.trim(),
        dueDate: new Date(dueDate),
        createDate: new Date(),
        status: false,
      }
      console.log(newTask);
      const saved = await createTask(newTask)
      onCreated?.(saved)
      onClose()
      setTitle('')
      setDescription('')
      setDueDate('')
    } finally {
      setSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        className="w-[90%] max-w-xl rounded-xl p-6 shadow-xl bg-sky-950"
      >
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block font-semibold text-sm">Title</label>
            <input
              className="w-full rounded border px-3 py-2 outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm">Description</label>
            <textarea
              className="w-full rounded border border-dashed px-3 py-2 outline-none border-slate-500"
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
              className="w-full rounded border px-3 py-2 outline-none"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>

          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-3xl cursor-pointer border px-4 py-2 duration-200 hover:bg-sky-900 "
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
  )
}


