'use client'

import { useEffect, useState } from 'react'
import TaskCard from '@/app/components/card/TaskCard'
import { Task } from '@/types/task'
import { getTasks } from '@/lib/api'
import Navbar from './components/Navbar'
import CreateTask from './components/CreateTask'
import Search from './components/Search'

async function fetchTasks(): Promise<Task[]> {
  const res = await getTasks();
  if (!res) throw new Error('Failed to fetch')
  return res;
}

export default function HomePage() {
  const [allData, setAllData] = useState<Task[]>([])
  const [data, setData] = useState<Task[]>([])
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetchTasks()
      .then((items) => {
        if (!cancelled) {
          setAllData(items)
          setData(items)
        }
      })
      .catch((err) => {
        console.error('Failed to load Tasks', err)
      })
    return () => {
      cancelled = true
    }
  }, [])
  
  return (
    <div className='min-h-screen w-full bg-red-50'> 
      <Navbar onCreateClick={() => setIsCreateOpen(true)} />

      <CreateTask
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreated={(t) => {
          setAllData((prev) => [t, ...prev])
          setData((prev) => [t, ...prev])
        }}
      />
      <div className="w-[90vw] m-auto mt-4">
        <Search all={allData} onSearch={setData} />
      </div>
      
      <div className="shadow-2xl rounded-xl h-[93vh] w-[90vw] m-auto mt-5">
        {data.map((t) => (
          <TaskCard
            key={t.id}
            {...t}
            onDeleted={(id) => {
              setAllData((prev) => prev.filter((x) => x.id !== id))
              setData((prev) => prev.filter((x) => x.id !== id))
            }}
          />
        ))}
      </div>

    </div>
  )
}
