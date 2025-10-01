'use client'

import { useEffect, useState } from 'react'
import TaskCard from '@/app/components/card/TaskCard'
import { Task } from '@/types/task'
import { getTasks } from '@/lib/api'
import Navbar from './components/Navbar'
import CreateTask from './components/CreateTask'
import Search from './components/Search'
import Sort from './components/Sort'
import Category from './components/Category'

async function fetchTasks(signal?: AbortSignal): Promise<Task[]> {
  const res = await getTasks(signal);
  if (!res) throw new Error("Failed to fetch");
  return res;
}

export default function HomePage() {
  
  const [allData, setAllData] = useState<Task[]>([])
  const [data, setData] = useState<Task[]>([])
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  function applySort(list: Task[], order: 'recent' | 'older') {
    const copy = [...list]
    copy.sort((a, b) => {
      const da = new Date(a.dueDate).getTime()
      const db = new Date(b.dueDate).getTime()
      return order === 'recent' ? db - da : da - db
    })
    return copy
  }

  useEffect(() => {
    const controller = new AbortController();
  
    fetchTasks(controller.signal)
      .then((items) => {
        const sorted = applySort(items, "recent");
        setAllData(sorted);
        setData(sorted);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Failed to load Tasks", err);
        }
      });
  
    return () => {
      controller.abort(); // cancel fetch on unmount
    };
  }, []);
  
  
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
        <div className="flex items-center gap-3">
          <Search all={allData} onSearch={(list) => setData(list)} />
          <Sort 
            onSort={(order: 'recent' | 'older') => {
              setAllData((prev) => applySort(prev, order))
              setData((prev) => applySort(prev, order))
            }} 
          />
        </div>
      </div>

      <Category tasks={data} setAllData={setAllData} setData={setData} />

    </div>
  )
}
