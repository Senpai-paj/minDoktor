'use client'

import { useEffect, useState } from 'react'
import TaskCard from '@/app/components/card/TaskCard'
import { Task } from '@/types/task'
import { getTasks } from '@/lib/api'
import Navbar from './components/Navbar'
import CreateTask from './components/CreateTask'

async function fetchTasks(): Promise<Task[]> {
  const res = await getTasks();
  if (!res) throw new Error('Failed to fetch')
  return res;
}

export default function HomePage() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('dueDate')
  const [data, setData] = useState<Task[]>([])
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetchTasks()
      .then((items) => {
        if (!cancelled) setData(items)
      })
      .catch((err) => {
        console.error('Failed to load Tasks', err)
      })
    return () => {
      cancelled = true
    }
  }, [])
  //Test for subrepo cleanup
  return (
    <div className='min-h-screen w-full bg-red-50'> 
      <Navbar onCreateClick={() => setIsCreateOpen(true)} />

      <CreateTask
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreated={(t) => setData((prev) => [t, ...prev])}
      />
      
      <div className="shadow-2xl rounded-xl h-[93vh] w-[90vw] m-auto mt-5">
        {data.map((t) => (
          <TaskCard key={t.id} {...t} />
        ))}
      </div>

    </div>
  )
}
