/**
 * Category component for displaying a paginated list of tasks.
 * Handles pagination, rendering TaskCards, and updating tasks state on edit/delete.
 *
 * @module Category
 */

import { Task } from "@/types/task";
import TaskCard from "../task/TaskCard";
import { useState } from "react";
import Pagination from "./Pagination";

/**
 * Props for Category component.
 * @typedef {Object} CategoryProps
 * @property {Task[]} tasks - Array of tasks in the category.
 * @property {React.Dispatch<React.SetStateAction<Task[]>>} setAllData - Setter for all tasks.
 * @property {React.Dispatch<React.SetStateAction<Task[]>>} setData - Setter for displayed tasks.
 * @property {string} [className] - Optional extra CSS class.
 */
type CategoryProps = {
    tasks: Task[];
    setAllData: React.Dispatch<React.SetStateAction<Task[]>>;
    setData: React.Dispatch<React.SetStateAction<Task[]>>;
}

/**
 * Category column component with pagination.
 *
 * @param {CategoryProps & { className?: string }} props - Props for the component.
 * @returns {JSX.Element} The rendered list of paginated tasks.
 */
export default function Category({ tasks, setAllData, setData, className }: CategoryProps & { className?: string }) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  /**
   * Paginated data for the current page.
   */
  const paginatedData = tasks.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className={`shadow-xl rounded-xl bg-gray-50 p-4 flex flex-col ${className}`}>
      
      <div className="flex-1 overflow-y-auto flex flex-col items-center space-y-4">
        {paginatedData.map((t) => (
          <TaskCard
            key={t.id}
            {...t}
            onDeleted={(id) => {
              setAllData((prev) => prev.filter((x) => x.id !== id));
              setData((prev) => prev.filter((x) => x.id !== id));
            }}
            onEdited={(task) => {
              setAllData((prev) => prev.map((x) => (x.id === task.id ? task : x)));
              setData((prev) => prev.map((x) => (x.id === task.id ? task : x)));
            }}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(tasks.length / pageSize)}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
