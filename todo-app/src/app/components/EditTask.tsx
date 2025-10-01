'use client'

import { useEffect, useRef, useState } from 'react'
import { editTask } from '@/lib/api'
import { X } from 'lucide-react'
import type { Task } from '@/types/task'

type EditTaskProps = {
  isOpen: boolean
  task: Task | null
  onClose: () => void
  onEdited?: (task: Task) => void
}

function formatDateInput(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export default function EditTask({ isOpen, task, onClose, onEdited }: EditTaskProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState(0);
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen && task) {
      setTitle(task.title ?? '')
      setDescription(task.description ?? '')
      setPriority(task.priority ?? 0)
      const asDate = new Date(task.dueDate)
      if (!isNaN(asDate.getTime())) setDueDate(formatDateInput(asDate))
      else setDueDate('')
    }
  }, [isOpen, task])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!task) return
    if (!title.trim() || !dueDate) return
    setSubmitting(true)
    try {
      const updated: Task = {
        ...task,
        title: title.trim(),
        description: description.trim(),
        dueDate: new Date(dueDate),
        editDate: new Date(),
        priority: priority,
      }
      const saved = await editTask(updated)
      onEdited?.(saved)
      onClose()
    } finally {
      setSubmitting(false)
    }
  }

  if (!isOpen || !task) return null

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
          <div>
            <label className="mb-1 block text-sm font-semibold">Priority</label>
            <select
              className="w-full rounded border px-3 py-2 outline-none bg-sky-950"
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
              className="rounded-3xl cursor-pointer border px-4 py-2 duration-200 hover:bg-sky-900 "
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-3xl bg-green-700 cursor-pointer px-4 durtation-300 py-2 text-white hover:bg-green-500 disabled:opacity-60"
            >
              {submitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}


