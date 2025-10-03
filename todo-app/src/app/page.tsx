/**
 * Home page for the todo application.
 * Displays the main UI, including navigation, task creation, search, sorting, and task listing.
 * Handles fetching tasks, displaying categories, and UI state management.
 *
 * @module app/page
 */

'use client'

import { useEffect, useState, useCallback } from 'react'
import { Task } from '@/types/task'
import { fetchTasks } from '@/lib/serivces/task.Service'
import Navbar from './components/Navbar'
import CreateTask from './components/CreateTask'
import Search from './components/Search'
import Sort from './components/Sort'
import Category from './components/Category'

/**
 * Main home page component.
 *
 * @returns {JSX.Element} The rendered home page.
 */
export default function HomePage() {
  /**
   * List of all tasks (unfiltered).
   * @type {[Task[], Function]}
   */
  const [allData, setAllData] = useState<Task[]>([]);
  /**
   * List of currently displayed tasks (may be filtered/search/sorted).
   * @type {[Task[], Function]}
   */
  const [data, setData] = useState<Task[]>([]);
  
  /**
   * Whether the create task dialog is open.
   * @type {[boolean, Function]}
   */
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  /**
   * Only one category for now. Can be evolved to multiple (e.g., kanban columns).
   * @type {Array<{ id: string, title: string, tasks: Task[] }>}
   */
  const categories = [
    { id: "todo", title: "To Do", tasks: data },
  ];

  /**
   * Applies sorting to a list of tasks by due date.
   * @param {Task[]} list - List of tasks to sort.
   * @param {string} order - Sorting order ('recent' or 'older').
   * @returns {Task[]} Sorted list of tasks.
   */
  function applySort(list: Task[], order: string) {
    const copy = [...list];
    copy.sort((a, b) => {
      const da = new Date(a.dueDate).getTime();
      const db = new Date(b.dueDate).getTime();
      return order === "recent" ? db - da : da - db;
    });
    return copy;
  }

  /**
   * Effect for fetching tasks on initial render.
   * Uses AbortController for cleanup.
   */
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

  /**
   * Callback for updating displayed tasks after a search.
   */
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
