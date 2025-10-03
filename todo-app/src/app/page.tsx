'use client'

import { useEffect, useState, useCallback } from 'react'
import { Task } from '@/types/task'
import { fetchTasks } from '@/lib/serivces/task.Service'
import Navbar from './components/Navbar'
import CreateTask from './components/CreateTask'
import Search from './components/Search'
import Sort from './components/Sort'
import Category from './components/Category'

export default function HomePage() {
  const [allData, setAllData] = useState<Task[]>([]);
  const [data, setData] = useState<Task[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  // Only one category for now, can be evolved to the kanban columns (was original idea if i had more time)
  const categories = [
    { id: "todo", title: "To Do", tasks: data },
  ];

  function applySort(list: Task[], order: string) {
    const copy = [...list];
    copy.sort((a, b) => {
      const da = new Date(a.dueDate).getTime();
      const db = new Date(b.dueDate).getTime();
      return order === "recent" ? db - da : da - db;
    });
    return copy;
  }

  useEffect(() => {
    const controller = new AbortController();

    fetchTasks(controller.signal)
      .then((items) => {
        setAllData(items);
        setData(items);
      })
      .catch((err) => {
        if (err.name !== "AbortError") console.error("Failed to load Tasks", err);
      });

    return () => controller.abort();
  }, []);

  const handleSearch = useCallback((list: Task[]) => setData(list), []);

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-100">
      
      <Navbar onCreateClick={() => setIsCreateOpen(true)} setData={setData} setAllData={setAllData} />

      <CreateTask
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreated={(t) => {
          setAllData((prev) => [t, ...prev]);
          setData((prev) => [t, ...prev]);
        }}
      />

      <div className="max-w-5xl mx-auto w-full px-4 mt-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <Search all={allData} onSearch={handleSearch} />
          <Sort
            onSort={(order: "recent" | "older") => {
              setAllData((prev) => applySort(prev, order));
              setData((prev) => applySort(prev, order));
            }}
          />
        </div>
      </div>

      <div className="flex-1 flex overflow-x-auto gap-4 px-4 py-4">
        {categories.map((cat) => (
          <Category
            key={cat.id}
            tasks={cat.tasks}
            setAllData={setAllData}
            setData={setData}
            className="flex-1 min-w-[300px] flex flex-col"
          />
        ))}
      </div>
    </div>
  );
}

